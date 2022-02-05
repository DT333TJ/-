/*
 * _______________#########_______________________ 
 * ______________############_____________________ 
 * ______________#############____________________ 
 * _____________##__###########___________________ 
 * ____________###__######_#####__________________ 
 * ____________###_#######___####_________________ 
 * ___________###__##########_####________________ 
 * __________####__###########_####_______________ 
 * ________#####___###########__#####_____________ 
 * _______######___###_########___#####___________ 
 * _______#####___###___########___######_________ 
 * ______######___###__###########___######_______ 
 * _____######___####_##############__######______ 
 * ____#######__#####################_#######_____ 
 * ____#######__##############################____ 
 * ___#######__######_#################_#######___ 
 * ___#######__######_######_#########___######___ 
 * ___#######____##__######___######_____######___ 
 * ___#######________######____#####_____#####____ 
 * ____######________#####_____#####_____####_____ 
 * _____#####________####______#####_____###______ 
 * ______#####______;###________###______#________ 
 * ________##_______####________####______________ 
 * 
 * @Author: DT333TJ
 * @Date: 2018-03-10 07:54:42
 * @LastEditTime: 2022-02-03 18:28:44
 * @LastEditors: DT333TJ
 * @Description: 
 * @FilePath: \mvr\src\lib\util.js
 */

/** 
 * @Desc: 工具类
 */
import md5 from 'js-md5'

// localstorage工具
export const localStorageUtil = {
  getItem: function(key) {
    return JSON.parse(localStorage.getItem(key))
  },
  setItem: function(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  removeItem: function (key) {
    localStorage.removeItem(key)
  }
}

// sessionStorage工具
export const sessionStorageUtil = {
  getItem: function(key) {
    return JSON.parse(sessionStorage.getItem(key))
  },
  setItem: function(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  removeItem: function (key) {
    sessionStorage.removeItem(key)
  }
}

// 发送axios请求的md5验证 
export function getHeadersValue(api, channel_code=10000, version='2.0.0', secrekey='gTdh9R3JcBvMRDi9') {
  let str = 'api'+ api +'channel_code'+ channel_code +'version'+ version +'secrekey'+ secrekey
  let obj = {
    api: api,
    channel_code: channel_code,
    version: version,
    sign: md5(str)
  }
  return obj
}

// 文件大小格式化
export function formatFileSize(value) {
  if (null == value || value == '') {
    return "0B"
  }
  var unitArr = new Array("B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB")
  var index = 0
  var srcsize = parseFloat(value)
  index = Math.floor(Math.log(srcsize) / Math.log(1024))
  var size = srcsize / Math.pow(1024, index)
  size = size.toFixed(1)
  size = size.toString().indexOf('.0') !== -1 ? parseInt(size) : size
  return size + unitArr[index]
}

// 验证手机号
export function validataPhone(value) {
  let pattern = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
  if (null == value || value == '') {
    return false
  } else if ( !value.match(pattern) || value.length != 11) {
    return false
  } else {
    return true
  }
}

// 校验长度在2~7的中文姓名
export function validateName(value) {
  let pattern = /^([\u4e00-\u9fa5]){2,7}$/
  if (value.match(pattern)) {
    return true
  } else {
    return false
  }
}

// 验证帐号(6~30位字符)
export function validateAccouts(value) {
  let pattern = /^.{6,30}$/
  if (null == value || value == '') {
    return false
  }else if ( !value.match(pattern)) {
    return false
  } else {
    return true
  }
}

// 验证密码(6~32位字符)
export function validatePassword(value) {
  let pattern = /^.{6,32}$/
  if (null == value || value == '') {
    return false
  } else if ( !value.match(pattern)) {
    return false
  } else {
    return true
  }
}

// 核对两次密码一致否
export function confirmPassword(password, confirmPassword) {
  if (password == confirmPassword) {
    return true
  } else return false
}