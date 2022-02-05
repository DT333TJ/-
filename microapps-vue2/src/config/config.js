/**
 * 网络请求相关配置
 */

let NODE_ENV = process.env.NODE_ENV
let baseURL = ''  //管理员

// 生产环境
if (NODE_ENV === 'production') {
  baseURL = 'http://192.168.0.158:28081'
}

// 开发环境
if (NODE_ENV === 'development') {
  baseURL = 'http://192.168.0.158:28081'
}

const auth = {
  username: 'viewshare',
  password: '3tZAoxbQAEG2nyGlvq6fhSuMNp0jN1A5'
}

export {
  baseURL,
  auth
}