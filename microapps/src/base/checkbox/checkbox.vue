/** 
 * @Desc: 复选框
 */
<template>
  <div class="checkbox">
    <input
      class="radio_input" 
      type="checkbox" 
      :name="name"
      :id="id"
      v-model="value"
      @change="_handleChange"
    />
    <label :for="id">{{text}}</label>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  name: 'checkbox',
  props: {
    text: {
      type: String
    },
    name: {
      type: String,
      default: 'checkbox'
    },
    id: {
      type: String
    }
  },
  data: function () {
    return {
      value: true
    }
  },
  methods: {
    /** 
     * 多选框改变
     */
    _handleChange: function(event) {
      this.$nextTick(() => {
        this.$emit('change', this.value)
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~style/variable'
  .checkbox
    display inline-block
    height 30px
    line-height 30px
    margin-right 10px
    margin-left 10px
    
    input[type='checkbox']
      display none !important
    input[type="checkbox"]:checked + label
      &:before
        content url(./img/right.png)
        text-align center
        line-height 17px
        
    label
      position relative
      padding-left 18px
      -webkit-user-select none
      -moz-user-select none
      -ms-user-select none
      user-select none
      cursor pointer
      font-size 12px
      &:before
        position absolute
        left 0
        bottom 2px
        content ""
        display inline-block
        vertical-align middle
        width 12px
        height 12px
        margin-right 10px
        border 1px solid $color-text-sub    
</style>
