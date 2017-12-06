'use strict'

import fs from 'fs'
import path from 'path'
import store from '@/store'
import Meyda from 'meyda'

import getusermedia from 'getusermedia'

const settings = {
  audio: {
    featureExtractors: ['rms'],
    label: 'default',
    bufferSize: 512,
    useFile: true
  }
}

const ctx = new window.AudioContext()
let analyzers = []
let file = null

export function getDeviceSources () {
  return navigator.mediaDevices.enumerateDevices()
    .then(devices => devices.filter(device => {
      return /audioinput/i.test(device.kind)
    }))
}

export function setRealtimeAnalyzer (device) {
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
      addAnalyzer({ stream, index: -1 })
    }
  })
}

export function addAnalyzer ({ stream, player, index }) {
  index++ // (poorly) make sure realtime device is index 0 and tracks are 1+
  if (!analyzers[index]) {
    if (!stream && !player) {
      console.error('no stream or player provided.')
    } else if (!stream && player) {
      stream = player.captureStream()
    }
    const source = ctx.createMediaStreamSource(stream)
    analyzers[index] = Meyda.createMeydaAnalyzer({
      source,
      audioContext: ctx,
      bufferSize: settings.audio.bufferSize,
      featureExtractors: settings.audio.featureExtractors,
      callback: (datas) => {
        if (datas.rms > store.state.audio.threshold) {
          console.log(index, datas)
          store.state.output.file && file.write(JSON.stringify(datas))
        }
      }
    })
  }
}

export function removeAnalyzer (index) {
  analyzers[index] = null
}

export function start () {
  if (store.state.output.file) {
    const storeFilename = store.state.output.filepath.name
    const storeFilefolder = store.state.output.filepath.folder

    const filename = storeFilename ? `${storeFilename}.json` : `aio-output-${Date.now()}.json`
    const folder = storeFilefolder || './'
    const filepath = path.resolve(folder, filename)
    console.log(filepath)

    file = fs.createWriteStream(filepath)
    file.write('[')
  }
  analyzers.forEach((analyzer) => analyzer && analyzer.start())
}

export function stop () {
  analyzers.forEach((analyzer) => analyzer && analyzer.stop())
  if (store.state.output.file) {
    file.write(']')
    file.end()
  }
}
