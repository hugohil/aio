'use strict'

// import * as audio from '@/lib/audio'

const state = {
  log: true,
  file: false,
  spacebro: {
    address: '',
    port: ''
  },
  filepath: {
    name: '',
    folder: ''
  }
}

const initial = Object.assign({}, state)

const mutations = {
  UPDATE_LOG (state, log) {
    state.log = log
  },
  UPDATE_FILE (state, file) {
    state.file = file
  },
  UPDATE_SPACEBRO_ADDRESS (state, address) {
    state.spacebro.address = address
  },
  UPDATE_SPACEBRO_PORT (state, port) {
    state.spacebro.port = port
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

const actions = {}

export default {
  state,
  mutations,
  actions
}
