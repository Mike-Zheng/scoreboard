import Vue from 'vue'
import Router from 'vue-router'
import Scoreboard from '@/components/Scoreboard'
// import addtohomescreen from './js/addtohomescreen.min'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Scoreboard',
      component: Scoreboard
    }
  ]
})
