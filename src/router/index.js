import Vue from 'vue'
import Router from 'vue-router'

import splashscreen from '@/components/splash'
import newGame from '@/components/newGame'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/play',
      name: 'newGame',
      component: newGame
    },
    {
      path: '/',
      name: 'splashscreen',
      component: splashscreen
    }
  ]
})
