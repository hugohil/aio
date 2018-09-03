'use strict'

import Vue from 'vue'
import settings from '@/lib/settings'

const state = {
  address: settings.service.spacebro.host,
  port: settings.service.spacebro.port
}

const initial = Object.assign({}, state)

const mutations = {
  UPDATE_SBADDRESS (state, address) {
    state.address = address
  },
  UPDATE_SBPORT (state, port) {
    state.port = port
  },
  CONNECT_SB (state) {
    let vue = new Vue()
    vue.$spacebro.connect(state.address, state.port)
  },
  DISCONNECT_SB (state) {
    let vue = new Vue()
    vue.$spacebro.disconnect()
  },
  SEND_SB (state, datas) {
    let vue = new Vue()
    vue.$spacebro.emit('aio-datas', datas)
  },
  RESET_INPUT (state) {
    state = initial
  }
}

const actions = {
  UPDATE_SBADDRESS ({ commit, state }, address) {
    commit('UPDATE_SBADDRESS', address)
  },
  UPDATE_SBPORT ({ commit, state }, port) {
    commit('UPDATE_SBPORT', port)
  },
  SEND_SB ({ commit, state }, datas) {
    commit('SEND_SB', datas)
  }
}

export default {
  state,
  mutations,
  actions
}
