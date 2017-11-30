'use strict'

import fs from 'fs'

import Meyda from 'meyda'

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

export function addAnalyzer ({ player, index }) {
  if (!analyzers[index]) {
    const stream = player.captureStream()
    const source = ctx.createMediaStreamSource(stream)
    analyzers[index] = Meyda.createMeydaAnalyzer({
      source,
      audioContext: ctx,
      bufferSize: settings.audio.bufferSize,
      featureExtractors: settings.audio.featureExtractors,
      callback: (datas) => {
        console.log(index, datas)
        file.write(JSON.stringify(datas))
      }
    })
  }
}

export function removeAnalyzer (index) {
  analyzers[index] = null
}

export function start () {
  const filename = `./aio-output-${Date.now()}.json`
  file = fs.createWriteStream(filename)
  file.write('[')
  analyzers.forEach((analyzer) => analyzer.start())
}

export function stop () {
  analyzers.forEach((analyzer) => analyzer.stop())
  file.write(']')
  file.end()
}
