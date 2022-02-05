/*
 *           佛曰:  
 *                   写字楼里写字间，写字间里程序员；  
 *                   程序人员写程序，又拿程序换酒钱。  
 *                   酒醒只在网上坐，酒醉还来网下眠；  
 *                   酒醉酒醒日复日，网上网下年复年。  
 *                   但愿老死电脑间，不愿鞠躬老板前；  
 *                   奔驰宝马贵者趣，公交自行程序员。  
 *                   别人笑我忒疯癫，我笑自己命太贱；  
 *                   不见满街漂亮妹，哪个归得程序员？
 * 
 * @Author: DT333TJ
 * @Date: 2022-02-04 15:49:36
 * @LastEditTime: 2022-02-04 15:51:53
 * @LastEditors: DT333TJ
 * @Description: 
 * @FilePath: \react-project\src\components\header\index.js
 */

import React, { Component, Fragment } from 'react'

class Header extends Component {
  render() {
    return (
      <Fragment>
        <div className="App font">
          <h1>This is React App.</h1>
        </div>
        <div className="App-other">
            <h1>This is React App-ohter.</h1>
        </div>
      </Fragment>
    )
  }
}

export default Header
