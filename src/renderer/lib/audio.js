'use strict'

import store from '@/store'
import Meyda from 'meyda'

import getusermedia from 'getusermedia'

const settings = {
  audio: {
    bufferSize: 512,
    useFile: true
  }
}

const ctx = new window.AudioContext()
let analyzers = []

export function getDeviceSources () {
  return navigator.mediaDevices.enumerateDevices()
    .then(devices => devices.filter(device => {
      return /audioinput/i.test(device.kind)
    }))
}

export function setRealtimeAnalyzer ({ device, index }) {
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
    if (analyzers[index]) {
      analyzers[index].setSource(source)
    } else {
      analyzers[index] = Meyda.createMeydaAnalyzer({
        source,
        audioContext: ctx,
        bufferSize: settings.audio.bufferSize,
        featureExtractors: store.state.audio.tracks[index].features,
        callback: (datas) => {
          // console.log(index, datas)
          console.log(datas)
        }
      })
    }
  } else {
    console.error('no stream provided.')
  }
}

export function removeAnalyzer (index) {
  analyzers.splice(index, 1)
}

export function start () {
  analyzers.forEach((analyzer, index) => {
    const features = store.state.audio.tracks[index].features
    analyzer && analyzer.start(features)
  })
}

export function stop () {
  analyzers.forEach((analyzer) => analyzer && analyzer.stop())
}
