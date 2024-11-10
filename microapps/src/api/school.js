/** 
 * @description 学校相关api
 */
import requester from 'config/requester'

/** 
 * 获取当前机构的所有所辖学校数据
 * @param {object} param: 请求参数
*/
export function requestGetSchools(param) {    
  const url = 'school'
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
 * 添加学校 
 */
export function requestPostSchool(param) {
  const method = 'post'
  const url = 'school'
  const params = {
    bureauId: param.bureauId,
    schoolName: param.schoolName,
    provinceCode: param.provinceCode,
    cityCode: param.cityCode,
    areaCode: param.areaCode,
    contacts: param.contacts,
    contactPhone: param.contactPhone,
    address: param.address,
    comment: param.comment
  }
  return requester.request({ url, params, method })
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}

/** 
 * 修改学校
*/
export function requestPatchSchool(param) {
  const method = 'patch'
  const url = `school/${param.id}`
  const params = {
    schoolName: param.schoolName,
    provinceCode: param.provinceCode,
    cityCode: param.cityCode,
    areaCode: param.areaCode,
    contacts: param.contacts,
    contactPhone: param.contactPhone,
    comment: param.comment,
    address: param.address
  }
  return requester.request({ url, params, method })
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}

/** 
 * 删除学校
 */
export function requestDeleteSchool(id) {
  const method = 'delete'
  const url = `school/${id}`
  return requester.request({ url , method})
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}


