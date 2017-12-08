'use strict'

import settings from '@/lib/settings'
import * as spacebro from '@/lib/spacebro'

const state = {
  log: true,
  spacebro: {
    active: false,
    address: settings.service.spacebro.host,
    port: settings.service.spacebro.port
  },
  filepath: {
    active: false,
    name: '',
    folder: ''
  }
}

const initial = Object.assign({}, state)

const mutations = {
  UPDATE_LOG (state, log) {
    state.log = log
  },
  ACTIVATE_SPACEBRO (state) {
    state.spacebro.active = true
  },
  DEACTIVATE_SPACEBRO (state) {
    state.spacebro.active = false
  },
  UPDATE_SPACEBRO_ADDRESS (state, address) {
    state.spacebro.address = address
  },
  UPDATE_SPACEBRO_PORT (state, port) {
    state.spacebro.port = port
  },
  ACTIVATE_FILEPATH (state) {
    state.filepath.active = true
  },
  DEACTIVATE_FILEPATH (state) {
    state.filepath.active = false
  },
  UPDATE_FILEPATH_NAME (state, name) {
    state.filepath.name = name
  },
  UPDATE_FILEPATH_FOLDER (state, folder) {
    state.filepath.folder = folder
  },
  RESET_OUTPUT (state) {
    state = initial
  }
}

const actions = {
  ACTIVATE_SPACEBRO ({ commit, state }) {
    spacebro.setup({ host: state.spacebro.address, port: state.spacebro.port })
    commit('ACTIVATE_SPACEBRO')
  },
  DEACTIVATE_SPACEBRO ({ commit, state }) {
    spacebro.unset()
    commit('DEACTIVATE_SPACEBRO')
  }
}

export default {
  state,
  mutations,
  actions
}
