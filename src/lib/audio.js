'use strict'

import Meyda from 'Meyda'

const settings = require('electron').remote.getGlobal('settings')
const getusermedia = require('getusermedia')
const loop = require('raf-loop')
const _ = require('lodash')

const label = settings.audio.label

const audioContext = new window.AudioContext()
let source = null

let meydaAnalyzer = null
let engine = null

module.exports = {
  init ({ onFrame }) {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices.enumerateDevices()
      .then(devices => devices.filter(device => {
        const isKind = /audio/i.test(device.kind)
        const hasLabel = new RegExp(label, 'i').test(device.label)
        return isKind && hasLabel
      }))
      .then(devices => {
        const audioDeviceIndex = _.findIndex(devices, { kind: 'audioinput' })
        const audioID = devices[audioDeviceIndex].deviceId
        console.info(`Acquiring audio from device "${devices[audioDeviceIndex].label}"`)
        console.info(devices[audioDeviceIndex])
        getusermedia({
          video: false,
          audio: {
            deviceId: {
              exact: audioID
            }
          }
        }, (err, stream) => {
          if (err) {
            console.warn(err)
            reject(err)
          } else {
            source = audioContext.createMediaStreamSource(stream)

            const featureExtractors = settings.audio.featureExtractors
            meydaAnalyzer = Meyda.createMeydaAnalyzer({
              featureExtractors,
              audioContext: audioContext,
              source: source,
              bufferSize: settings.audio.bufferSize,
              windowingFunction: 'hamming'
            })

            engine = loop(onFrame)

            resolve()
          }
        })
      })
    })
  },
  get: (feature) => meydaAnalyzer.get(feature),
  start: () => {
    meydaAnalyzer.start()
    engine.start()
  },
  stop: () => {
    meydaAnalyzer.stop()
    engine.stop()
  }
}
