<template>
  <div class="about">
    <h1>This is an about page</h1>
    <router-view></router-view>
    <div id="umi1Container"></div>
  </div>
</template>

<script>
// import { loadMicroApp } from 'qiankun';
export default {
  name: 'About',
  data() {
    return {
      obj: null
    }
  },
  // mounted() {
  //   this.obj = loadMicroApp({
  //     name: 'umi',
  //     entry: '//localhost:9091/about/fbm',
  //     container: '#umi1Container',
  //   })
  //   console.log('this.obj', this.obj)
  // },
  unmounted() {
    // console.log('123', 123)
    // this.obj.unmount()
    // this.obj = null
  }
}
</script>
