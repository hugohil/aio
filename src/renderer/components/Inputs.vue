<template>
  <div class="inputs__container">
    <h2>inputs</h2>
    <div>
      <label for="realtime-select"><h3>Realtime track:</h3></label>
      <select v-model="selectedDevice"
        :disabled="computing"
        class="device__selector"
        id="realtime-select"
      >
        <option disabled value="">Select device</option>
        <option v-for="device in devices"
          :key="device.deviceId"
          :value="device"
        >{{ device.label }}</option>
      </select>
      <!-- TODO
        device type = mono | stereo | multi-channel
       -->
    </div>
    <div>
      <h3>File tracks:</h3>
      <div class="file__controls">
        <button
          @click="playAllFiles"
          :disabled="playing || !tracks.files.sources.length"
        ><i class="material-icons icon--button">play_arrow</i></button>
        <button
          @click="pauseAllFiles($event, false)"
          :disabled="!playing"
        ><i class="material-icons icon--button">pause</i></button>
        <button
          @click="pauseAllFiles($event, true)"
          :disabled="!playing"
        ><i class="material-icons icon--button">stop</i></button>
      </div>
      <div v-for="index in tracks.files.count" :key="index">
        <button :disabled="computing" @click="removeFileInput((index - 1))">&minus;</button>
        <label :for="`file-${index}`">track {{index}}:</label>
        <input
          class="file__selector"
          accept="audio/*"
          type="file"
          :disabled="computing"
          @change="onFile($event, (index - 1))"
          :id="`file-${index}`"
          :name="`file-${index}`"
        >
        <audio
          class="file__player"
          :src="getFilePath((index - 1))"
          ref="fileplayer"
          preload
          controls
        ></audio>
      </div>
      <div class="file__manage">
        <button :disabled="computing" @click="addFileInput">&plus;</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { getDeviceSources } from '@/lib/audio'

  export default {
    name: 'inputs',
    data () {
      return {
        playing: false,
        tracks: {
          realtime: null,
          files: {
            count: 0,
            sources: []
          }
        }
      }
    },
    computed: {
      selectedDevice: {
        get: function () {
          return this.$store.state.audio.device
        },
        set: function (value) {
          this.$store.dispatch('SELECT_DEVICE', value)
        }
      },
      devices: function () {
        return this.$store.state.audio.devices
      },
      computing: function () {
        return this.$store.state.audio.computing
      }
    },
    created () {
      getDeviceSources().then(devices => { this.$store.commit('INIT_DEVICES', devices) })
    },
    methods: {
      removeFileInput (index) {
        this.tracks.files.count--
        if (this.tracks.files.sources[index]) {
          this.tracks.files.sources.splice(index, 1)
          this.$store.dispatch('REMOVE_FILE', index)
        }
      },
      addFileInput () {
        this.tracks.files.count++
      },
      onFile ({ target }, index) {
        const file = target.files[0] || null
        this.tracks.files.sources[index] = file
        this.$store.dispatch('ADD_FILE', {
          player: this.$refs.fileplayer[index],
          index,
          file
        })
        if (file) {
        } else {
        }
        this.$nextTick(this.$forceUpdate)
      },
      getFilePath (index) {
        const track = this.tracks.files.sources[index]
        return track ? `file://${track.path}` : ''
      },
      playAllFiles () {
        this.playing = true
        this.$refs.fileplayer && this.$refs.fileplayer.forEach((player) => {
          player.currentSrc && player.play()
        })
      },
      pauseAllFiles (event, stop = false) {
        this.playing = false
        this.$refs.fileplayer && this.$refs.fileplayer.forEach((player) => {
          player.currentSrc && player.pause()
          stop && (player.currentTime = 0)
        })
      }
    }
  }
</script>

<style>
  .file__player {
    display: block;
  }
  .file__controls {
    margin: 1em 0;
  }
</style>
