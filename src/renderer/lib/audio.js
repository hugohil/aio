'use strict'

import store from '@/store'
import settings from '@/lib/settings'

import Meyda from 'meyda'

import getusermedia from 'getusermedia'

const bufferSize = 512

let isThresholdReset = false

const ctx = new window.AudioContext()

export function getDeviceSources () {
  return navigator.mediaDevices.enumerateDevices()
    .then(devices => devices.filter(device => {
      return /audioinput/i.test(device.kind)
    }))
}

export function createRealtimeAnalyzer ({ device, index }) {
  getusermedia({
    video: false,
    audio: {
      deviceId: {
        exact: device.deviceId
      }
    }
  }, (err, stream) => {
    if (err) {
      console.warn(err)
    } else {
      addAnalyzer({ stream, index })
    }
  })
}

export function addAnalyzer ({ stream, index }) {
  if (stream) {
    const source = ctx.createMediaStreamSource(stream)
    source.channelCountMode = 'explicit'
    console.log(source)
    if (store.state.audio.analyzers[index]) {
      store.state.audio.analyzers[index].setSource(source)
    } else {
      const analyzer = Meyda.createMeydaAnalyzer({
        source,
        audioContext: ctx,
        inputs: source.channelCount,
        bufferSize,
        featureExtractors: store.state.audio.tracks[index].features,
        callback: (datas) => {
          if (datas.rms > store.getters['currentThreshold']) {
            isThresholdReset = false
            console.log(datas)
            store.commit('SEND_SB', datas)
          } else if (settings.audio.resetBelowThreshold && !isThresholdReset) {
            console.log({ rms: 0 })
            store.commit('SEND_SB', { rms: 0 })
            isThresholdReset = true
          }
        }
      })
      store.commit('ADD_ANALYZER', { analyzer, index })
    }
  } else {
    console.error('no stream provided.')
  }
}

export function updateChannel ({ channel, index }) {
  store.state.audio.analyzers[index].setChannel(channel)
}

export function start () {
  store.state.audio.analyzers.forEach((analyzer, index) => {
    const features = store.state.audio.tracks[index].features
    analyzer && analyzer.start(features)
  })
}

export function stop () {
  store.state.audio.analyzers.forEach((analyzer) => analyzer && analyzer.stop())
}
