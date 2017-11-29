import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'aio',
      component: require('@/components/AIO').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
