import Vue from 'vue'
import Router from 'vue-router'

import splashscreen from '@/components/splash'
import create from '@/components/create'
import scoreboard from '@/components/scoreboard'
import remote from '@/components/remote'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/create',
      name: 'create',
      component: create
    },
    {
      path: '/',
      name: 'splashscreen',
      component: splashscreen
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
