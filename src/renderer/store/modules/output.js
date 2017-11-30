'use strict'

// import * as audio from '@/lib/audio'

const state = {
  log: true,
  stream: true,
  spacebro: {
    address: '',
    port: ''
  },
  file: {
    name: '',
    location: '',
    format: ''
  }
}

const initial = Object.assign({}, state)

const mutations = {
  UPDATE_LOG (state, log) {
    state.log = log
  },
  UPDATE_STREAM (state, stream) {
    state.stream = stream
  },
  UPDATE_SPACEBRO (state, spacebro) {
    state.spacebro = spacebro
  },
  UPDATE_FILE (state, file) {
    state.file = file
  },
  RESET_OUTPUT (state) {
    state = initial
  }
}

const actions = {}

export default {
  state,
  mutations,
  actions
}
