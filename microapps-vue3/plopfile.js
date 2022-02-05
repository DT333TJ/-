/*
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 * 
 * 
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 *            佛祖保佑       永不宕机     永无BUG
 * 
 * @Author: DT333TJ
 * @Date: 2022-02-03 14:17:29
 * @LastEditTime: 2022-02-03 16:29:50
 * @LastEditors: DT333TJ
 * @Description: 快速生成vue模板
 * @FilePath: \vite-project\plopfile.JS
 */

const notEmpty = name => {
  return v => {
    if (!v || v.trim === '') {
      return `${name} is required`
    } else {
      return true
    }
  }
}

export default function (plop) {
  // plop generator code
  plop.setGenerator('create', {
    description: 'create a vue component or page',
    prompts: [{
      type: 'confirm',
      name: 'type',
      message: 'component(Y) or page(N) please',
      validate: notEmpty('type')
    },
    {
      type: 'input',
      name: 'name',
      message: 'component or page name please',
      validate: notEmpty('name')
    },
    {
      type: 'checkbox',
      name: 'blocks',
      message: 'Blocks:',
      choices: [{
        name: 'template',
        value: 'template',
        checked: true
      },
      {
        name: 'script',
        value: 'script',
        checked: true
      },
      {
        name: 'style',
        value: 'style',
        checked: true
      }
      ],
      validate(value) {
        if (value.indexOf('script') === -1 && value.indexOf('template') === -1) {
          return 'Components require at least a script or template tag.'
        }
        return true
      }
    }
    ],
    actions: data => {
      const { type, name, blocks } = data
      let path = 'src/' + (type ? `components/` : `views/`) + `${name}.vue`
      const actions = [{
        type: 'add',
        path,
        templateFile: 'plop-templates/template.hbs',
        data: {
          template: blocks.includes('template'),
          script: blocks.includes('script'),
          style: blocks.includes('style'),
        }
      }]

      return actions
    }
  })
};
