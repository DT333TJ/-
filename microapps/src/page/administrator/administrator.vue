/** 
 * @desc 后台管理
 */
<template>
  <div class="administrator">
    <m-header></m-header>
    <div class="mgrid administrator-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { sessionStorageUtil } from 'lib/util'

export default {
  name: 'administrator',
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
  .administrator
    width 100%
    height 100%
    .administrator-wrapper
      margin 0 auto
</style>
