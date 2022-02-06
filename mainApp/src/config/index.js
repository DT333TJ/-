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
 * @Date: 2022-02-06 10:46:40
 * @LastEditTime: 2022-02-06 20:45:36
 * @LastEditors: DT333TJ
 * @Description: 
 * @FilePath: \qiankun-vue\mainApp\src\config\index.js
 */

const apps = [
  {
    name: "vue2",
    entry: "//localhost:8080/children/vue2",
    container: "#frameContainer",
    activeRule: "/children/vue2",
  },
  // {
  //   name: "vue3",
  //   entry: "//localhost:3000/children/vue3",
  //   container: "#frameContainer",
  //   activeRule: "/children/vue3",
  // },
  // {
  //   name: "react17",
  //   entry: "//localhost:9001/children/react17",
  //   container: "#frameContainer",
  //   activeRule: "/children/react17",
  // },
]


import { registerMicroApps, start, addGlobalUncaughtErrorHandler  } from "qiankun"


/**
 * 注册微应用
 * 第一个参数 - 微应用的注册信息
 * 第二个参数 - 全局生命周期钩子
 */
registerMicroApps(apps, {
  // qiankun 生命周期钩子 - 微应用加载前
  beforeLoad: (app) => {
    console.log("before load", app.name);
    return Promise.resolve();
  },
  // qiankun 生命周期钩子 - 微应用挂载后
  afterMount: (app) => {
    console.log("after mount", app.name);
    return Promise.resolve();
  },
});

/**
 * 添加全局的未捕获异常处理器
 */
addGlobalUncaughtErrorHandler((event) => {
  console.error(event);
  const { message } = event;
  // 加载失败时提示
  if (message && message.includes("died in status LOADING_SOURCE_CODE")) {
    message.error("微应用加载失败，请检查应用是否可运行");
  }
});

// 导出 qiankun 的启动函数
export default start;