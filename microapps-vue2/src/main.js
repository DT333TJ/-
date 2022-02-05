/*
 * @Author: DT333TJ
 * @Date: 2018-03-10 07:54:42
 * @LastEditTime: 2022-02-02 15:48:33
 * @LastEditors: DT333TJ
 * @Description: 
 * @FilePath: \mvr\src\main.js
 */
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from 'router'
import 'router/filter'
import MHeader from 'component/m-header'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'style/index.styl'

Vue.config.productionTip = false
Vue.use(MHeader)
Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
