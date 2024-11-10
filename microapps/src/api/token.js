/** 
 * @description 管理员登录token相关
 */
import axios from 'axios'
import { baseURL, auth } from 'config/config.js'


/** 
* 获取token
* @param {Object} param: 参数对象
*/
export function requestGetToken(param) {
  const url = 'oauth/token'
  const method = 'post'
  const params = {
    username: param.username,
    password: param.password,
    grant_type: 'password'
  }
  return axios.request({ baseURL, params, method, url, auth })
    .then( response => {
      return Promise.resolve(response)
    })
    .catch( error => {
      return Promise.reject(error.response)
    })
}


/**
 * 刷新token
 * @param  {string} refresh_token: 刷新token
 */ 
export function requestRefreshToken(refresh_token) {
  const method = 'post'
  const url = 'oauth/token'
  const params = {
    grant_type: 'refresh_token',
    refresh_token
  }
  return axios.request({ method, baseURL, url, auth, params })
    .then(response => { 
      return Promise.resolve(response.data)
    })
    .catch(error => {
      return Promise.reject(error)
    })
}
