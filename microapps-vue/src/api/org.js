/** 
 * @description 机构相关api
 */
import requester from 'config/requester'

/** 
 * 获取下拉的省地市联动数据 
 */
export function requestGetProvince() {
  const url = 'menu/province'
  return requester.request({ url })
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    }) 
}

/** 
* 获取机构列表
* @param {object} param : 参数对象 
*/
export function requestGetAllOrgs(param) {
  const url = 'bureau'
  const params = param
  return requester.request({ url, params })
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}

/** 
 * 添加机构
 * @param {object} param 
 */
export function requestPostOrg(param) {
  const method = 'post'    
  const url = 'bureau'
  const params = {
    bureauName: param.bureauName,
    provinceCode: param.provinceCode,
    cityCode: param.cityCode,
    areaCode: param.areaCode,
    contacts: param.contacts,
    contactPhone: param.contactPhone,
    comment: param.comment
  }
  return requester.request({ url, params, method})
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}

/** 
 * 修改机构 
 * @param {object} param 
 */
export function requestPatchOrg(param) {
  const method = 'patch'
  const url = `bureau/${param.id}`
  const params = {
    bureauName: param.bureauName,
    provinceCode: param.provinceCode,
    cityCode: param.cityCode,
    areaCode: param.areaCode,
    contacts: param.contacts,
    contactPhone: param.contactPhone,
    comment: param.comment
  }
  return requester.request({ url, params , method})
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}

/** 
 * 删除机构 
 */
export function requestDeleteOrg(id) {
  const method = 'delete'
  const url = `bureau/${id}`
  return requester.request({ url , method})
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}


