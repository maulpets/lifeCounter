import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import splashscreen from '@/components/splash'

import signup from '@/components/signup'
import login from '@/components/login'


import main from '@/components/main'



import playgroups from '@/components/playgroups/manageGroups'
import manageGames from '@/components/game/manageGames'

import newGame from '@/components/newGame'
import play from '@/components/game/play'

import remote from '@/components/gameUI/remote/remote'
import scoreboard from '@/components/scoreboard'


import AuthGaurd from './AuthGaurd'

Vue.use(Router)

 const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'splashscreen',
      component: splashscreen
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/main',
      name: 'main',
      component: main,
      beforeEnter: AuthGaurd
    },
    {
      path: '/playgroups',
      name: 'playgroups',
      component: playgroups
    },
    {
      path: '/manageGames',
      name: 'manageGames',
      component: manageGames
    },
    {
      path: '/play',
      name: 'play',
      component: play
    },
    {
      path: '/newGame',
      name: 'newGame',
      component: newGame
    },
    {
      path: '/scoreboard',
      name: 'scoreboard',
      component: scoreboard
    },
    {
      path: '/remote',
      name: 'remote',
      component: remote
    }
  ]
})



export default router
