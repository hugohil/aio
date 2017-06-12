'use strict'

import Meyda from 'Meyda'

const settings = require('electron').remote.getGlobal('settings')
const getusermedia = require('getusermedia')
const _ = require('lodash')

const label = settings.audio.label
const channels = settings.audio.channels

const ctx = new window.AudioContext()
let analyzers = []
let processor

module.exports = {
  init (callback) {
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
            const source = ctx.createMediaStreamSource(stream)

            const splitter = ctx.createChannelSplitter(channels)
            source.connect(splitter)

            const featureExtractors = settings.audio.featureExtractors
            for (let i = 0; i < channels; i++) {
              const meyda = Meyda.meyda()
              analyzers.push(meyda.createMeydaAnalyzer({
                audioContext: ctx,
                source: splitter,
                channelCount: channels,
                channelIndex: i,
                featureExtractors,
                bufferSize: settings.audio.bufferSize,
                callback: (datas, channel) => {
                  typeof (callback) === 'function' && callback(datas, channel)
                }
              }))
            }

            resolve()
          }
        })
      })
    })
  },
  start () { for (let i = 0; i < channels; i++) { analyzers[i].start() } },
  stop () { for (let i = 0; i < channels; i++) { analyzers[i].stop() } },
  destroy () { analyzers = [] }
}
