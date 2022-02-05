/** 
 * @description 管理员相关api
 */
import requester from 'config/requester'

/**
 * 获取下拉列表的机构和学校数据 
 */
export function requestGetSelectDatas() {
  const url = 'menu/bureau'
  return requester.request({ url })
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}

/** 
 * 获取所有的管理员数据 
*/
export function requestGetAllAdmins(param) {
  const url = 'user'
  const params = {
    bureauId: param.bureauId,
    schoolId: param.schoolId,
    catcher: param.catcher,
    pageSize: param.pageSize,
    pageNum: param.pageNum
  }
  return requester.request({ url , params})
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}

/** 
 * 添加超级管理员
*/
export function requestPostSuperAdmin(param) {
  const url = 'superAdmin'
  const method = 'post'
  const params = {
    bureauId: param.bureauId,
    schoolId: param.schoolId,
    loginName: param.loginName,
    userName: param.userName,
    phone: param.phone
  }
  return requester.request({ url, method, params})
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}

/**
 * 添加学校管理员
 */
export function requestPostSchoolAdmin(param) {
  const url = 'systemAdmin'
  const method = 'post'
  const params = {
    bureauId: param.bureauId,
    schoolId: param.schoolId,
    loginName: param.loginName,
    userName: param.userName,
    phone: param.phone
  }
  return requester.request({ url, method, params})
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}

/** 
 * 教师添加
*/
export function requestPostTeacher(param) {
  const url = 'teacher'
  const method = 'post'
  const params = {
    bureauId: param.bureauId,
    schoolId: param.schoolId,
    loginName: param.loginName,
    userName: param.userName,
    phone: param.phone,
    grade: param.grade,
    clazz: param.clazz,
    subject: param.subject
  }
  return requester.request({ url, method, params})
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}

/** 
 * 修改管理员(超级和学校管理员)
*/
export function requestPatchAdmin(param) {
  const url = `admin/${param.id}`
  const method = 'patch'
  const params = {
    userName: param.userName,
    phone: param.phone,
  }
  return requester.request({ url, method, params})
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}

/** 
 * 修改老师
*/
export function requestPatchTeacher(param) {
  const url = `teacher/${param.id}`
  const method = 'patch'
  const params = {
    userName: param.userName,
    phone: param.phone,
    grade: param.grade,
    clazz: param.clazz,
    subject: param.subject
  }
  return requester.request({ url, method, params})
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}


/** 
 * 删除管理员
*/
export function requestDeleteAdmin(id) {
  const url = `admin/${id}`
  const method = 'delete'
  return requester.request({ url, method })
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}

/** 
 * 删除教师
*/
export function requestDeleteTeacher(id) {
  const url = `teacher/${id}`
  const method = 'delete'
  return requester.request({ url, method })
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}

/** 
 * 重置密码
*/
export function requestResetPassword(param) {
  const url = `reset/${param.type}/${param.id}`
  const method = 'patch'
  return requester.request({ url, method })
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}

/** 
 * 导出教师信息
*/
export function requesteExportTeacherInfo(bureauId, schoolId) {
  const url = `download/${bureauId}/${schoolId}`
  return requester.request({ url })
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}

/** 
 * 上传excel
*/
export function requestUploadExcel(excelFile, bureauId, schoolId) {
  const url = `upload/${bureauId}/${schoolId}`
  const method = 'post'
  const data = excelFile
  const headers = {'Content-Type': 'multipart/form-data'}
  return requester.request({ url, method, data, headers })
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}

/** 
 * 普通管理员批量添加教师时机构和学校ID的获得
*/
export function requestGetSystemAdmin() {
  const url = 'systemAdmin'
  return requester.request({ url })
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}