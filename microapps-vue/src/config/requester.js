/*
 * @Author: DT333TJ
 * @Date: 2018-03-10 07:54:42
 * @LastEditTime: 2022-02-03 18:26:39
 * @LastEditors: DT333TJ
 * @Description: 
 * @FilePath: \mvr\src\config\requester.js
 */
/*
 * @Author: your name
 * @Date: 2018-03-10 07:54:42
 * @LastEditTime: 2022-02-02 15:51:26
 * @LastEditors: DT333TJ
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \mvr\src\config\requester.js
 */
import axios from 'axios'
import { baseURL } from 'config/config'
 
// 创建实例
let requester = axios.create({
  baseURL: baseURL,
  timeout: 5000
})

requester.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default requester


