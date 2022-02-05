/*
 * @Author: your name
 * @Date: 2018-03-10 07:54:42
 * @LastEditTime: 2022-02-02 18:43:22
 * @LastEditors: DT333TJ
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \mvr\src\router\filter.js
 */
/**
 * 路由校验
 */
import router from 'router'

router.beforeEach((to, from, next) => {
  // 页面title
  document.title = to.meta.title
  next() 
})