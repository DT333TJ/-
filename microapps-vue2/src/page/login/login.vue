/** 
 * @desc 管理员登录
 */
<template>
  <div class="login" :style="{'background-image': `url(${require('../../image/login_bg.jpg')})`}">
    <div class="login-form">
      <!-- title -->
      <div class="form-title">微视频后台管理</div>
      <!-- 表单区域 -->
      <div class="manager-login">
        <!-- 用户名 -->
        <div class="form-item">
          <input 
            type="text"
            ref="UserName"  
            placeholder="用户名" 
            class="input-item"
            maxlength="30"
            @keyup.enter="_LoginButtonClick"
            v-model.trim="loginForm.userName" />
        </div>
        <!-- 密码 -->
        <div class="form-item" style="margin-bottom: 0">
          <input 
            type="password"
            ref="Password" 
            placeholder="密码" 
            class="input-item"
            maxlength="32"
            @keyup.enter="_LoginButtonClick"
            v-model.trim="loginForm.password" />
        </div>
        <!-- 文字提示 -->
        <div class="form-message">{{loginText}}</div>
        <!-- 记住密码 -->
        <!-- <div class="form-item" style="height: 30px;line-height: 30px; margin-bottom: 20px">
          <check-box
            style="float:left"
            :text="checkbox.text" 
            :id="checkbox.id" 
            @change="_getCheckedValue"
          ></check-box>
        </div> -->
        <!-- 登录按钮 -->
        <div class="form-item">
          <button class="clickable button-item" @click="_LoginButtonClick">后台登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import CheckBox from 'base/checkbox/checkbox'
import { sessionStorageUtil, localStorageUtil, validateAccouts, validatePassword, getHeadersValue } from 'lib/util'
import { Base64 } from 'js-base64'
import cookie from 'js-cookie'
import { requestGetToken } from 'api/token'
import { requestGetRole } from 'api/role'

export default {
  name: 'manager',
  components: {
    CheckBox
  },
  data: function() {
    return {
      loginForm: {
        userName: 'kskjtest',
        password: '123456'
      },
      checkbox: {
        text: '记住我',
        id: 'Forget'
      },
      loginText: '',
      rememberFlag: true
    }
  },
  // 当前路由离开的时候要清除定时器
  beforeRouteLeave: function(to, from, next) {
    clearTimeout(this.timeOut)
    next()
  },
  created: function() {
    this._getDataFromStorage()
  },
  methods: {
    /** 
     * 5秒后自动清除登录的提示文字  
     */
    _clearLoginText: function() {
      this.timeOut =setTimeout( ()=> {
        this.loginText = ''
      }, 5000)
    },

    /** 
     * 从存储中获取信息 
     */
    _getDataFromStorage: function() {
      // 数据存在就赋值
      this.loginForm.userName = localStorageUtil.getItem('m-userName') ? localStorageUtil.getItem('m-userName') : this.loginForm.userName 
      this.loginForm.password = localStorageUtil.getItem('m-password') ? localStorageUtil.getItem('m-password') : this.loginForm.password
    },

    /** 
     * 存储账号信息 
     */
    _storageUserInfo: function() {
      localStorageUtil.setItem('m-userName', this.loginForm.userName)
      localStorageUtil.setItem('m-password', this.loginForm.password)
    },

    /** 
     * 清除账号信息 
     */
    _clearStorageData: function() {
      localStorageUtil.getItem('m-userName') && localStorageUtil.removeItem('m-userName')
      localStorageUtil.getItem('m-password') && localStorageUtil.removeItem('m-password')
    },

    /** 
     * 设置记住密码 
     */
    _getCheckedValue: function(value) {
      this.rememberFlag = value
    },

    /** 
     * 登录点击 
     */
    _LoginButtonClick: function() {
      // 变量设置
      if (this.loginForm.userName == 'root') {
        this.$router.replace('/organization')
      } else {
        this.$router.replace('/administrator')
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~style/variable'
  @import '~style/mixin'

  .login
    position relative
    width 100%
    height 100%
    background-repeat no-repeat
    background-size cover
    .login-form
      position absolute
      top 50%
      right 160px
      transform translateY(-60%)
      width 300px
      border-radius 6px 
      background-color white   
      /* 表单名称 */
      .form-title
        height 60px
        line-height 60px
        text-align center
        font-size $font-size-large-x
        letter-spacing 2px
        color $color-text-g
        font-weight bolder

      /* 表单区域 */
      .manager-login
        padding 20px
        /* form-item */
        .form-item
          height 40px
          line-height 40px
          margin-bottom 10px
          text-align center
          clear-float()
          .input-item
            width 100%
            height 35px
            line-height 35px
            padding-left 20px
            text-align left
            border 1px solid $color-border-sub
            border-radius 4px
            &:hover
              border-color $color-text-sub
          .button-item
            width 80%
            background-color $color-text-sub
            border-radius 4px
            color #ffffff
          .forget-item
            float right
            font-size 12px
            
        /* form提示信息 */
        .form-message
          height 25px
          line-height 25px
          font-size $font-size-small
          color red      
</style>
