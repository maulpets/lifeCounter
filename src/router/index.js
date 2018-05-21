import Vue from 'vue'
import Router from 'vue-router'

import splashscreen from '@/components/splash'

import signup from '@/components/signup'
import login from '@/components/login'

import main from '@/components/main'

import newPlayGroup from '@/components/newPlayGroup'
import joinPlayGroup from '@/components/joinPlayGroup'

import newGame from '@/components/newGame'
import join from '@/components/join'

import play from '@/components/play'

import game from '@/components/game'


import scoreboard from '@/components/scoreboard'
import remote from '@/components/remote'


Vue.use(Router)

export default new Router({
  mode: 'history',
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
      component: main
    },
    {
      path: '/newPlayGroup',
      name: 'newPlayGroup',
      component: newPlayGroup
    },
    {
      path: '/joinPlayGroup',
      name: 'joinPlayGroup',
      component: joinPlayGroup
    },
    {
      path: '/play',
      name: 'play',
      component: play
    },
    {
      path: '/game',
      name: 'game',
      component: game
    },
    {
      path: '/newGame',
      name: 'newGame',
      component: newGame
    },
    {
      path: '/join',
      name: 'join',
      component: join
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
