<template>
  <div class="root">
    <header>
      <h1>a.io</h1>
      <button :disabled="!isAudioAvailable" @click="toggle">{{ isAudioAnalyzing ? 'stop' : 'start' }}</button>
    </header>
    <div v-for="(channel, index) in channels" class="channel">
      <p><b>channel #{{ index + 1 }}</b></p>
      <div v-for="(value, name) in channel">
        <p>{{ name }}: <span class="indicator" :style="{ width: getWidth(value) }">{{ value ? value : 0 }}</span></p>
      </div>
    </div>
  </div>
</template>
<script>
'use strict'

const settings = require('electron').remote.getGlobal('settings')

import audio from './lib/audio'

export default {
  data () {
    return {
      isAudioAvailable: false,
      isAudioAnalyzing: false,
      channels: new Array(settings.audio.channels).fill(Object.assign(...settings.audio.featureExtractors.map((feature) => ({ [feature]: 0 }))))
    }
  },
  methods: {
    getWidth (raw) {
      let value = Math.round(raw < 1 ? raw * 100 : raw)
      return `${value}px`
    },
    toggle () {
      !this.isAudioAnalyzing && audio.start()
      this.isAudioAnalyzing && audio.stop()
      this.isAudioAnalyzing = !this.isAudioAnalyzing
    }
  },
  mounted () {
    audio.init((data, index) => {
      if (this.isAudioAnalyzing) {
        this.channels[index] = data
        this.channels = this.channels.slice(0) // lol, this hack
      }
    }).then(() => {
      this.isAudioAvailable = true
    })
  },
  destroyed () {
    audio.destroy()
  }
}
</script>
<style>
html {
  height: 100%;
  background: #E1E1E1;
  font-family: Source Sans Pro, Helvetica, sans-serif;
}
#app {
  color: #2c3e50;
  max-width: 600px;
  text-align: center;
}
#app a {
  color: #42b983;
  text-decoration: none;
}
#app p {
  margin-left: auto;
  margin-right: auto;
  max-width: 600px;
}
#app > div {
  position: absolute;
  width: 100%;
}
/*.indicator {
  display: inline-block;
  height: 10px;
  background: #0A0A0A;
}*/
.channel {
  display: inline-block;
  width: 300px;
}
</style>
