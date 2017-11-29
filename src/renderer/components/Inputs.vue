<template>
  <div class="inputs__container">
    <h2>inputs</h2>
    <div>
      <label for="realtime-select"><h3>Realtime track:</h3></label>
      <select v-model="tracks.realtime" class="device__selector" id="realtime-select">
        <option disabled value="">Select device</option>
        <option value="device-1">Device #1</option>
        <option value="device-2">Device #2</option>
      </select>
      <!-- TODO
        device type = mono | stereo | multi-channel
       -->
    </div>
    <div>
      <h3>File tracks:</h3>
      <button @click="removeFileInput">&minus;</button>
      <button @click="addFileInput">&plus;</button>
      <div v-for="index in tracks.files.count" :key="index">
        <label :for="`file-${index}`">track {{index}}:</label>
        <!-- TODO
          accept="audio/*"
        -->
        <input
          class="file__selector"
          type="file"
          @change="onFile($event, index)"
          :id="`file-${index}`"
          :name="`file-${index}`"
        >
        <!-- TODO
          check file is selected
         -->
        <button @click="togglePlayback(index)">toggle playback</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'inputs',
    data () {
      return {
        tracks: {
          realtime: null,
          files: {
            count: 0,
            sources: []
          }
        }
      }
    },
    methods: {
      removeFileInput () {
        if (this.tracks.files.count) {
          this.tracks.files.count--
          this.tracks.files.sources.splice(-1, 1)
        }
      },
      addFileInput () {
        this.tracks.files.count++
      },
      onFile ({ target }, index) {
        this.tracks.files.sources[(index - 1)] = target.files[0]
      },
      togglePlayback (index) {
        const file = this.tracks.files.sources[(index - 1)]
        console.log(file.name)
      }
    }
  }
</script>

<style></style>
