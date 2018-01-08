'use strict'

import * as audio from '@/lib/audio'

const state = {
  computing: false,
  threshold: 0.05,
  analyzers: [],
  devices: [],
  tracks: []
}

const initial = Object.assign({}, state)

const mutations = {
  INIT_DEVICES (state, devices) {
    state.devices = devices
  },
  SELECT_DEVICE (state, { device, index }) {
    typeof state.tracks[index] === 'object'
      ? state.tracks[index].device = device
      : state.tracks[index] = { device }
  },
  SELECT_CHANNEL (state, { channel, index }) {
    typeof state.tracks[index] === 'object'
      ? state.tracks[index].channel = channel
      : state.tracks[index] = { channel }
  },
  ADD_ANALYZER (state, { analyzer, index }) {
    state.analyzers.splice(index, 1) // hack to force vuex to dispatch change to components
    state.analyzers[index] = analyzer
  },
  START_ANALYZERS (state) {
    state.computing = true
  },
  STOP_ANALYZERS (state) {
    state.computing = false
  },
  UPDATE_FEATURES (state, { features, index }) {
    typeof state.tracks[index] === 'object'
      ? state.tracks[index].features = features.filter(f => f.length)
      : state.tracks[index] = { features }
  },
  RESET_INPUT (state) {
    state = initial
  }
}

const actions = {
  SELECT_DEVICE ({ commit, state }, track) {
    commit('SELECT_DEVICE', track)
    audio.createRealtimeAnalyzer(track)
  },
  SELECT_CHANNEL ({ commit, state }, channel) {
    commit('SELECT_CHANNEL', channel)
    audio.updateChannel(channel)
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
