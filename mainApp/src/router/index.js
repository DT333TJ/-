import Vue from 'vue'
import VueRouter from 'vue-router'
// 一个进度条插件
import NProgress from "nprogress"
import "nprogress/nprogress.css"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: "history",
  base: '/star/yc/',
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to, from, next)
  // ...
  NProgress.start()
  next()
})

router.afterEach((to, from) => {
  console.log(to, from)
  // ...
  NProgress.done();
})

export default router
