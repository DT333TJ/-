<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/about/fbm/organization/organization-list">About</router-link> |
      <router-link to="/vue">Vue2</router-link> |
      <!-- <router-link to="/fbm">fbm</router-link> | -->
      <router-link to="/umi">umi</router-link> 
    </div>

    <section class="main" ref="wrapper">
      <div>
        <router-view />  
        <!-- <router-view v-if="$route.name === 'Home' || $route.name === 'About'"/>   -->
        <section id="frameContainer"></section>
        <!-- <section id="frameContainer1"></section> -->
        <!-- <div id="umiContainer"></div> -->
      </div>

      <div class="custom-vertical-scrollbar" id="vertical">
        <div class="custom-vertical-indicator"></div>
      </div>
    </section>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
import ScrollBar from '@better-scroll/scroll-bar'

BScroll.use(ScrollBar)
BScroll.use(MouseWheel)

export default {
  data() {
    return {
      bs: null
    }
  },
  watch: {
    $route: {
      handler:  function (val, oldVal){
        console.log(val, oldVal);
        if (val.path && oldVal.path) {
          setTimeout(function () {
            this.bs && this.bs.refresh()
          }, 30)
        }
      },
     // 深度观察监听
     deep:  true,
   }
  },
  mounted() {
    setTimeout(function() {
      const vertical = document.getElementById('vertical')
      this.bs = new BScroll('.main', {
        scrollY: true,
        scrollX: false,
        click: true,
        bounce: {
          top: false,
          bottom: false,
          left: true,
          right: true
        },
        mouseWheel: {
          speed: 20,
          invert: false,
          easeTime: 300
        },
        scrollbar: {
          customElements: [vertical]
        }
      })
    }, 100)
  }, 
  destroyed() {
    this.bs.destroy()
    this.bs = null
  }
}
</script>


<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

#nav {
  box-sizing: border-box;
  height: 60px;
  line-height: 60px;
  /* margin-left: 140px; */
  background-color: #61795c
}

#nav a {
  font-weight: bold;
  color: #7eacda;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.side-bar {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 140px;
  height: 100%;
  padding-top: 60px;
  background-color: rgb(18, 74, 107);
}
.side-bar-item {
  color: white;
  cursor: pointer;
  padding: 10px 0;
  text-align: center;
}
.main {
  position: relative;
  /* margin-left: 140px; */
  height: calc(100vh - 60px);
  overflow: hidden;
}
.custom-vertical-scrollbar {
  position: absolute;
  top: 50%;
  right: 10px;
  height: 400px;
  width: 7px;
  border-radius: 6px;
  transform: translateY(-50%) translateZ(0);
  background-color: rgb(200, 200, 200, 0.3)
}
.custom-vertical-indicator {
  width: 100%;
  height: 20px;
  border-radius: 6px;
  background-color: #42b983
}
</style>
