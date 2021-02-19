<template>
  <div id="app">
    <!-- {{isMobilePortrait}} -->
    <!-- <img src="./assets/logo.png"> -->
    <div class="rotate-panel " v-bind:class="{ 'rotate-lanscape': isMobilePortrait }" v-bind:style="{ height: appHeight + 'px', width: appWidth + 'px' ,'transform-origin': appHeight/2 +'px'}">
      <!-- v-bind:style="{ height: windowHeight + 'px', width: windowWidth + 'px' }" -->
      <transition name="fade">
        <Loading v-if="isLoading" marginTop="50%"></Loading>
      </transition>
      <router-view></router-view>
      <!-- <div class="black"> </div> -->
    </div>
  </div>
</template>
<script>
import Loading from './components/Loading.vue'
import TimeUnit from './components/TimeUnit';




if (navigator.vendor.indexOf("Apple") == 0 && /\sSafari\//.test(navigator.userAgent)) {
  addToHomescreen({
    skipFirstVisit: false,
    maxDisplayCount: 99
  });
}



export default {
  name: 'app',
  components: {
    Loading,
    TimeUnit
  },
  data: function() {
    return {
      windowWidth: 0,
      windowHeight: 0,
      isLoading: true
    }
  },
  mounted() {
    var self = this;
    setTimeout(function() {
      self.isLoading = false;
    }, 2000);

    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowWidth);
      window.addEventListener('resize', this.getWindowHeight);
      this.getWindowWidth()
      this.getWindowHeight()
    })

  },
  computed: {
    isMobilePortrait: function() {
      if (this.windowWidth > this.windowHeight)
        return false;
      else
        return true;
    },
    appHeight() {
      if (this.isMobilePortrait) {
        return this.windowWidth;

      } else {
        return this.windowHeight;
      }
    },
    appWidth() {
      if (this.isMobilePortrait) {
        return this.windowHeight;
      } else {
        return this.windowWidth;
      }
    }
  },

  methods: {
    getWindowWidth(event) {
      this.windowWidth = document.documentElement.clientWidth;

    },

    getWindowHeight(event) {
      this.windowHeight = document.documentElement.clientHeight;

    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth);
    window.removeEventListener('resize', this.getWindowHeight);
  }

}

</script>
<style lang="scss">
html {
  -ms-touch-action: manipulation;
  touch-action: manipulation;
}
a, button
{
  -ms-touch-action: manipulation; /* IE10  */
  touch-action: manipulation;   /* IE11+ */
}

@import "./scss/_reset";
@import "./scss/_mobile";
@import "./scss/_flexboxgrid.css";
$fa-font-path: "~font-awesome/fonts";
@import "~font-awesome/scss/font-awesome.scss";
@import "./scss/addtohomescreen.css";

* {
  font-family: "PingFang TC",
  "PingFang SC",
  STHeiti,
  "微軟正黑體",
  "Microsoft Yahei",
  sans-serif;
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active below version 2.1.8 */

{
  opacity: 0
}

html {
  -webkit-text-size-adjust: 100%;
  /* Prevent font scaling in landscape while allowing user zoom */
}

#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  font-family: Helvetica, 'PingFang', 'Microsoft JhengHei', 'Microsoft YaHei', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 20px;
}

.rotate-panel {

  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 500;
  position: fixed;
}

.rotate-panel.rotate-lanscape {
  transform: rotate(90deg);
}

.black {
  height: 100%;
  width: 100%;
  background-color: #000;
}

</style>
