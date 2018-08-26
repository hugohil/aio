'use strict'

import * as spacebro from '@/lib/spacebro'

const state = {
  address: 'spacebro.space',
  port: 3333
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
    spacebro.connect(state.address, state.port)
  },
  SEND_SB (state, datas) {
    spacebro.send(datas)
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
