<template>
  <div class="inputs__container">
    <h2>inputs</h2>
    <div>
      <label for="realtime-select"><h3>Realtime track:</h3></label>
      <select v-model="input.tracks.realtime" class="device__selector" id="realtime-select">
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
      <div v-for="index in input.tracks.files.count">
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
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'inputs',
    data () {
      return {
        input: {
          tracks: {
            realtime: null,
            files: {
              count: 0,
              sources: []
            }
          }
        }
      }
    },
    methods: {
      removeFileInput () {
        if (this.input.tracks.files.count) {
          this.input.tracks.files.count--
          this.input.tracks.files.sources.splice(-1, 1)
        }
      },
      addFileInput () {
        this.input.tracks.files.count++
      },
      onFile ({ target }, index) {
        this.input.tracks.files.sources[(index - 1)] = target.files[0]
      }
    }
  }
</script>

<style></style>
