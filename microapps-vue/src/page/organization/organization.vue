/** 
 * @desc 后台管理
 */
<template>
  <div class="organization">
    <m-header></m-header>
    <div class="mgrid organization-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { sessionStorageUtil } from 'lib/util'

export default {
  name: 'organization',
  components: {
    
  },
  data: function() {
    return {
      
    }
  },
  methods: {
    /** 
     * 登录点击 
     */
   
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~style/variable'
  .organization
    width 100%
    height 100%
    .organization-wrapper
      margin 0 auto
      padding-bottom 20px
</style>
