'use strict'

import Vue from 'vue'
import Router from 'vue-router'
import Root from '../Root'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Root
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
