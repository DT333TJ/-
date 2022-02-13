import Vue from 'vue'
import App from './App.vue'
import router from './router'
import startQiankun from './config'

// 启动乾坤
startQiankun()

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
