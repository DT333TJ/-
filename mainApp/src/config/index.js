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
 * @LastEditTime: 2022-02-06 11:17:24
 * @LastEditors: DT333TJ
 * @Description: 
 * @FilePath: \qiankun-Vue2-Vue3-React17\mainApp\src\config\index.js
 */

// 此时我们还没有微应用，所以 apps 为空
const apps = []

// 一个进度条插件
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { registerMicroApps, start, addGlobalUncaughtErrorHandler  } from "qiankun"


/**
 * 注册微应用
 * 第一个参数 - 微应用的注册信息
 * 第二个参数 - 全局生命周期钩子
 */
registerMicroApps(apps, {
  // qiankun 生命周期钩子 - 微应用加载前
  beforeLoad: (app) => {
    // 加载微应用前，加载进度条
    NProgress.start();
    console.log("before load", app.name);
    return Promise.resolve();
  },
  // qiankun 生命周期钩子 - 微应用挂载后
  afterMount: (app) => {
    // 加载微应用前，进度条加载完成
    NProgress.done();
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