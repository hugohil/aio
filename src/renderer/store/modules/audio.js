'use strict'

import * as audio from '@/lib/audio'

const state = {
  computing: false,
  threshold: 0.05,
  devices: [],
  tracks: []
}

const initial = Object.assign({}, state)

const mutations = {
  INIT_DEVICES (state, devices) {
    state.devices = devices
  },
  SELECT_DEVICE (state, { device, index }) {
    // state.tracks[index].device && state.tracks.splice(index, 1) // ensure track is removed so observers get new value
    typeof state.tracks[index] === 'object'
      ? state.tracks[index].device = device
      : state.tracks[index] = { device }
  },
  START_ANALYZERS (state) {
    state.computing = true
  },
  STOP_ANALYZERS (state) {
    state.computing = false
  },
  UPDATE_FEATURES (state, { features, index }) {
    typeof state.tracks[index] === 'object'
      ? state.tracks[index].features = features
      : state.tracks[index] = { features }
  },
  RESET_INPUT (state) {
    state = initial
  }
}

const actions = {
  SELECT_DEVICE ({ commit, state }, track) {
    commit('SELECT_DEVICE', track)
    audio.setRealtimeAnalyzer(track)
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
