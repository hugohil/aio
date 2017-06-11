'use strict'

import Meyda from 'Meyda'

const settings = require('electron').remote.getGlobal('settings')
const getusermedia = require('getusermedia')
const _ = require('lodash')

const label = settings.audio.label

const ctx = new window.AudioContext()
let processor = null

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
            const channelsIn = settings.audio.channels
            const channelsOut = 1

            processor = ctx.createScriptProcessor(ctx.bufferSize, channelsIn, channelsOut)

            const source = ctx.createMediaStreamSource(stream)
            const splitter = ctx.createChannelSplitter(channelsIn)
            const merger = ctx.createChannelMerger(channelsIn)

            source.connect(splitter)
            splitter.connect(processor)
            processor.connect(merger)
            merger.connect(ctx.destination)

            console.log(processor)
            processor.onaudioprocess = (event) => {
              let extractedDatas = new Array(channelsIn)
              for (var i = 0; i < channelsIn; i++) {
                const audioDatas = event.inputBuffer.getChannelData(i)
                extractedDatas[i] = Meyda.extract(settings.audio.featureExtractors, audioDatas)
              }
              typeof (callback) === 'function' && callback(extractedDatas)
            }

            resolve()
          }
        })
      })
    })
  },
  destroy () { processor.onaudioprocess = null }
}
