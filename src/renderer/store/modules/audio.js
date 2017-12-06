'use strict'

import * as audio from '@/lib/audio'

const state = {
  computing: false,
  threshold: 0.05,
  devices: [],
  tracks: {
    realtime: null,
    files: []
  }
}

const initial = Object.assign({}, state)

const mutations = {
  INIT_DEVICES (state, devices) {
    state.devices = devices
  },
  SELECT_DEVICE (state, device) {
    state.tracks.realtime = device
  },
  ADD_FILE (state, { file, index }) {
    state.tracks.files[index] = file
  },
  REMOVE_FILE (state, index) {
    state.tracks.files.splice(index || -1, 1)
  },
  START_ANALYZERS (state) {
    state.computing = true
  },
  STOP_ANALYZERS (state) {
    state.computing = false
  },
  UPDATE_THRESHOLD (state, threshold) {
    state.threshold = threshold
  },
  RESET_INPUT (state) {
    state = initial
  }
}

const actions = {
  SELECT_DEVICE ({ commit, state }, device) {
    commit('SELECT_DEVICE', device)
    audio.setRealtimeAnalyzer(device)
  },
  ADD_FILE ({ commit, state }, { file, player, index }) {
    player.addEventListener('play', () => {
      audio.addAnalyzer({ player, index })
    })
    commit('ADD_FILE', { file, index })
  },
  REMOVE_FILE ({ commit, state }, index) {
    audio.removeAnalyzer(index)
    commit('REMOVE_FILE', index)
  },
  START_ANALYZERS ({ commit, state }) {
    audio.start()
    commit('START_ANALYZERS')
  },
  STOP_ANALYZERS ({ commit, state }) {
    audio.stop()
    commit('STOP_ANALYZERS')
  }
}

export default {
  state,
  mutations,
  actions
}
