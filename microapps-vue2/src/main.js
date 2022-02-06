/*
 * @Author: DT333TJ
 * @Date: 2018-03-10 07:54:42
 * @LastEditTime: 2022-02-06 18:03:01
 * @LastEditors: DT333TJ
 * @Description: 
 * @FilePath: \qiankun-Vue2-Vue3-React17\microapps-vue2\src\main.js
 */
import './public-path'
import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from "vue-router";
import App from './App'
import routes from 'router'
import MHeader from 'component/m-header'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'style/index.styl'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(MHeader)
Vue.use(ElementUI)

let router = null;
let instance = null;
function render(props = {}) {
  const { container } = props;
  router = new VueRouter({
    base: '/children/vue2',
    mode: 'history',
    routes,
  });

  instance = new Vue({
    router,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}
export async function mount(props) {
  console.log('[vue] props from main framework', props);
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  router = null;
}

