import Vue from 'vue'
import Router from 'vue-router'

import splashscreen from '@/components/splash'
import signup from '@/components/signup'
import login from '@/components/login'

import create from '@/components/create'
import scoreboard from '@/components/scoreboard'
import remote from '@/components/remote'


Vue.use(Router)

export default new Router({
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
      path: '/create',
      name: 'create',
      component: create
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
