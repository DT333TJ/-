/**
 * @Desc: 管理头部
 */
<template>
  <div class="header">
    <div class="header-wrapper">
      <!-- logo -->
      <div class="header-logo">
        <a class="header-logo-content" @click="_logoButtonClick">
          <!-- <img :src="require('./img/logo.png')" alt="BBC-微视频资源库"> -->
          微视频教学资源库
          <!-- <el-avatar :size="'large'" :src="circleUrl"></el-avatar> -->
          <el-avatar :size="60" src="https://empty" @error="errorHandler">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
          </el-avatar>

          <el-avatar :size="60" src="https://empty" :error="errorHandler">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
          </el-avatar>
        </a>
      </div>
      <!-- 菜单 -->
      <div class="header-nav">
        <router-link v-if="orgFlag" to="/organization">机构管理</router-link>
        <router-link to="/administrator">用户管理</router-link>
      </div>
      <!-- 退出 -->
      <div class="header-logout">
        <router-link class="header-search-help header-search-logout" :to="{name: 'login'}" replace>退出</router-link>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { requestGetRole } from 'api/role'
  import ElAvatar from './../avatar/main.vue'

  export default {
    components: { ElAvatar },
    name: 'm-header',
    data: function() {
      return {
        orgFlag: true,
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      }
    },
    created () {
      this._handleGetRole()
    },
    methods: {
      errorHandler() {
        console.log('llll')
        return true
      },
      /** 
       * 请求帐号角色的方法 
      */
      _handleGetRole: function() {
        return requestGetRole()
          .then( response => {
            if (response.code == 0) {
              response.data.role == 'root' ? this.orgFlag = true : this.orgFlag = false
            }
          })
      },

      /**
       * logo按钮点击事件
      */
      _logoButtonClick: function() {
        this.$router.push( '/organization' )
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~style/variable'
  @import '~style/mixin'

  .header 
    height 70px
    background-color #1f2d3d
    clear-float()
    .header-wrapper
      width 100%
      height 100% 

      /* logo */
      .header-logo
        float left
        margin-right 50px
        height 100%
        .header-logo-content
          display block
          width 220px
          height 70px
          line-height 70px
          color $color-text-w
          font-size $font-size-large
          font-weight bolder
          clear-float()
          img
            float left
            width 46px
            height 46px
            margin 12px 6px 0 0

      /* nav */ 
      .header-nav
        float left
        a
          display inline-block
          width 100px
          height 70px
          line-height 70px
          margin-right 100px
          text-align center
          color $color-text-w
          font-size $font-size-medium-x
          font-weight bolder
          &:hover
            color $color-theme-sub
            border-bottom 6px solid $color-theme-sub
        /* 路由激活类 */ 
        .router-active    
          color $color-theme-sub
          border-bottom 6px solid $color-theme-sub

      /* 退出区域 */
      .header-logout
        position relative
        float right 
        margin-right 40px 
        .header-search-help
          display inline-block
          height 70px
          line-height 70px
          color $color-text-w
          font-size 15px
          font-weight bolder
        .header-search-logout
          padding 0 5px        
</style>






