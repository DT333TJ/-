<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/vue">Vue2</router-link> 
    </div>

    <!-- <nav class="side-bar">
      <ul>
        <li class="side-bar-item" @click="pushRouter('vue2')">vue2</li>
        <li class="side-bar-item" @click="pushRouter('vue3')">vue3</li>
        <li class="side-bar-item" @click="pushRouter('react')">react</li>
        <li class="side-bar-item" @click="pushRouter('about')">About</li>
      </ul>
    </nav> -->

    <section class="main" ref="wrapper">
      <div>
        <transition v-if="$route.name" name="fade" mode="out-in" appear>
          <router-view />  
        </transition>
        <section v-else id="frameContainer">
          测试
        </section>
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
        if (val.name && oldVal.name) {
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
        mouseWheel: {
          speed: 20,
          invert: false,
          easeTime: 300
        },
        scrollbar: {
          customElements: [vertical]
        }
      })
    }, 30)
  }, 
  methods: {
    pushRouter(type) {
      // if (type !== 'about' && type !== 'home') {
      //   type = '/children/' + type
      // }
      this.$router.push(`/${type}`)
      console.log("type", type)
    }
  },
  destroyed() {
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
