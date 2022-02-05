/** 
 * @description 角色类型相关api
 */
import requester from 'config/requester'

/** 
* 获取用户帐号类型 
*/
export function requestGetRole() {
  const url = 'role'
  return requester.request({ url })
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}

