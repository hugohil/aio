import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'

import settings from '@/lib/settings'
import VueSpacebroClient from 'vue-spacebro-client'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

Vue.use(VueSpacebroClient, settings.service.spacebro, store)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
