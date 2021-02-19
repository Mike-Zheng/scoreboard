<template>
  <div class="score-panel">
    <div class="left score-info">
      <div class="decrease-button" v-on:click="decreaseScore(1)">
        <p class="center"><i class="fa fa-minus" aria-hidden="true"></i></p>
      </div>
      <div class="score-button" v-on:click="addScore(1)">
        <div class="score-text">
          <time-unit :value="score1" index="0"></time-unit>
        </div>
      </div>
    </div>
    <div class="meta-function">
      <div class="setting-button" v-on:click="clean()">
        <p class="center"><i class="fa fa-bars" aria-hidden="true"></i></p>
      </div>
      <div class="flip-button" v-on:click.prevent="change()">
        <p class="center"><i class="fa fa-exchange" aria-hidden="true"></i></p>
      </div>
      <div class="play-box">
        <div class="left play-info">
          <div class="contain">
            <div class="decrease-button" v-on:click="decreasePlay(1)">
              <p class="center"><i class="fa fa-minus" aria-hidden="true"></i></p>
            </div>
            <div class="score-button" v-on:click.prevent="addPlay(1)">
              <div class="score-text">
                <time-unit :value="play1" type="play" index="0"></time-unit>
              </div>
            </div>
          </div>
        </div>
        <div class="right play-info">
          <div class="contain">
            <div class="decrease-button" v-on:click="decreasePlay(2)">
              <p class="center"><i class="fa fa-minus" aria-hidden="true"></i></p>
            </div>
            <div class="score-button" v-on:click.prevent="addPlay(2)">
              <div class="score-text">
                <time-unit :value="play2" type="play" index="0"></time-unit>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right score-info">
      <div class="decrease-button" v-on:click="decreaseScore(2)">
        <p class="center"><i class="fa fa-minus" aria-hidden="true"></i></p>
      </div>
      <div class="score-button" v-on:click="addScore(2)">
        <div class="score-text">
          <time-unit :value="score2" index="0"></time-unit>
        </div>
      </div>
    </div>
    <transition name="modal" v-if="showCleanModal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
            </div>
            <div class="modal-body">
              重新開始?
            </div>
            <div class="modal-footer">
              <button class="modal-default-button confirm" v-on:click="modalConfirm()">
                OK
              </button>
              <button class="modal-default-button cancel" v-on:click="modalCancel()">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import Loading from './Loading.vue'
import TimeUnit from './TimeUnit';

export default {
  name: 'Scoreboard',
  props: ['date', 'callback'],
  components: {
    Loading,
    TimeUnit
  },
  data() {
    return {
      score1: 0,
      score2: 0,
      play1: 0,
      play2: 0,
      showCleanModal: false
    }
  },
  computed: {
    score1View() {
      return this.score1;
    },
    score2View() {
      return this.score2;
    },
    play1View() {
      return this.play1;
    },
    play2View() {
      return this.play2;
    }

  },
  methods: {
    modalConfirm() {
      this.showCleanModal = false;
      this.score1 = 0;
      this.score2 = 0;
      this.play1 = 0;
      this.play2 = 0;
    },
    modalCancel() {
      this.showCleanModal = false;
    },
    clean() {
      this.showCleanModal = true;
    },
    change() {

      var tmpS, tmpP;
      tmpS = this.score1;
      this.score1 = this.score2;
      this.score2 = tmpS;

      tmpP = this.play1;
      this.play1 = this.play2;
      this.play2 = tmpP;

    },
    addScore(order) {
      if (order == 1) {
        if (this.score1 < 99)
          this.score1++;
      } else if (order == 2) {
        if (this.score2 < 99)
          this.score2++;
      }
    },
    decreaseScore(order) {
      if (order == 1) {
        if (this.score1 > 0)
          this.score1--;
      } else if (order == 2) {
        if (this.score2 > 0)
          this.score2--;
      }
    },
    addPlay(order) {
      if (order == 1) {
        if (this.play1 < 99)
          this.play1++;
      } else if (order == 2) {
        if (this.play2 < 99)
          this.play2++;
      }
    },
    decreasePlay(order) {
      if (order == 1) {
        if (this.play1 > 0)
          this.play1--;
      } else if (order == 2) {
        if (this.play2 > 0)
          this.play2--;
      }
    }

  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$box-color:#424d5b;
$bg-color:#252f3b;
.score-panel {
  height: 100%;
  width: 100%;
  background-color: $bg-color;
  overflow: hidden;
}

.score-info {
  position: absolute;
  height: 100%;
  width: 30%;
  /*background-color: #FFF;*/
  padding: 15px;
  &.left {
    left: 0;
  }
  &.right {
    right: 0;
  }
  .decrease-button {
    position: relative;
    background-color: $box-color;
    height: 10%;
    width: 100%;
    border-radius: 5px;
    line-height: 1rem;
    font-size: 3rem;
    color: #FFF;
  }
  .score-button {
    border-radius: 5px;
    margin-top: 10px;
    background-color: $box-color;
    height: 80%;
    width: 100%;
    .score-text {
      font-size: 140px;
      text-align: center;
      line-height: 80%;
      vertical-align: middle;
      color: #FFF;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

p.center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.meta-function {
  padding: 15px 0;
  position: absolute;
  height: 100%;
  width: calc(40% - 60px);
  /*background-color: #FFF;*/
  transform: translate(-50%);
  left: 50%;
  .setting-button {
    background-color: $box-color;
    position: relative;
    height: 10%;
    width: 100%;
    border-radius: 5px;
    line-height: 2rem;
    font-size: 2rem;
    color: #FFF;
  }
  .flip-button {
    z-index: 100;
    background-color: $box-color;
    position: relative;
    height: 10%;
    width: 100%;
    border-radius: 5px;
    line-height: 2rem;
    font-size: 2rem;
    color: #FFF;
    margin-top: 10px;
  }
  .play-box {
    border-radius: 5px;
    margin-top: 10px;
    /*background-color: #424d5b;*/
    height: 80%;
    width: 100%;
    .play-info {
      position: absolute;
      height: 30%;
      width: calc(50% - 5px);
      /*width: calc(50% - 5px);*/
      /*background-color: #FFF;*/
      /*padding: 0 15px;*/
      .contain {
        padding: 10px;
        background-color: #424d5b;
        border-radius: 5px;
        position: absolute;
        height: 30%;
        /*width: calc(50% - 30px);*/
        position: relative;
        height: 100%;
        width: calc(100% - 20px);
        ;
      }
      &.left {
        left: 0;
      }
      &.right {
        right: 0;
      }
      .decrease-button {
        z-index: 5;
        line-height: 1rem;
        font-size: 2rem;
        color: #FFF;
        height: 25%;
        width: calc(100% - 20px);
        border-radius: 5px;
        background-color: $bg-color;
        position: absolute;
        z-index: 20;
      }
      .score-button {
        font-size: 4em;
        line-height: 1em;
        color: #f3c21a;
        bottom: 10px;
        height: calc(75% - 30px);
        width: calc(100% - 20px);
        border-radius: 5px;
        background-color: #252f3b;
        position: absolute;
        z-index: 10;
        text-shadow: 2px 2px 2px rgba(10, 10, 10, 0.6);
        .score-text {
          font-size: 140px;
          text-align: center;
          line-height: 1rem;
          vertical-align: middle;
          color: #FFF;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}



.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
  height: 100%;
  background-color: #21262d;
  border: none;
  border-radius: 5px;
  width: 40%;
  color: #FFF;
  margin: 5px;
  &.cancel {
    background-color: #c1392d;
  }
  &.confirm {
    background-color: #297fb8;
  }
}

.modal-footer {
  height: 40px;
}





/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
