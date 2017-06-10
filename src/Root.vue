<template>
  <div class="root">
    <h1>a.io</h1>
    <button :disabled="!isAudioAvailable" @click="toggle">{{ isAudioAnalyzing ? 'stop' : 'start' }}</button>
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
      isAudioAnalyzing: false
    }
  },
  methods: {
    toggle () {
      !this.isAudioAnalyzing && audio.getAnalyzer().start()
      this.isAudioAnalyzing && audio.getAnalyzer().stop()
      this.isAudioAnalyzing = !this.isAudioAnalyzing
    },
  },
  mounted () {
    audio.init().then(() => {
      console.info(audio.getAnalyzer())
      this.isAudioAvailable = true
    })
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
</style>
