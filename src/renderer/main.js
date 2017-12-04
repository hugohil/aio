import Vue from 'vue'
import VueSpacebroClient from 'vue-spacebro-client'
import settings from '@/lib/settings'

import App from './App'
import router from './router'
import store from './store'

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
