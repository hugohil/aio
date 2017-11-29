<template>
  <aside class="sidebar container">
    <div class="sidebar__child sidebar__child--inputs">
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
    <div class="sidebar__child sidebar__child--outputs">
      <h2>outputs</h2>
      <div>
        <label for="output-log">log:</label>
        <input type="checkbox" v-model="output.log" id="output-log" name="output-log">
      </div>
      <div>
        <h3>Spacebro:</h3>
        <label for="output-spacebro-address">address:</label>
        <input type="text" v-model="output.spacebro.address" id="output-spacebro-address" name="output-spacebro-address">
        <br><label for="output-spacebro-port">port:</label>
        <input type="number" v-model="output.spacebro.port" min="1000" max="9999" id="output-spacebro-port" name="output-spacebro-port">
      </div>
      <div>
        <h3>File:</h3>
        <label for="output-file-name">name:</label>
        <!-- TODO
          default generic name
         -->
        <input type="text" v-model="output.file.name" id="output-file-name" name="output-file-name">
        <br><label for="output-file-location">location:</label>
        <!-- TODO
          file path selector
         -->
        <input type="text" v-model="output.file.location" id="output-file-location" name="output-file-location">
        <br><label for="output-file-format">format:</label>
        <select v-model="output.file.format" id="output-file-format">
          <option disabled value="">Select format</option>
          <option>json</option>
          <option>csv</option>
        </select>
      </div>
    </div>
    <div class="sidebar__child sidebar__child--params">
      <h2>params</h2>
      <div>
        <label for="params-threshold">threshold:</label>
        <input type="range" min="0" max="1" step="0.001" v-model="params.threshold" id="params-threshold">
        <input type="number" v-model="params.threshold" min="0" max="1" step="0.001">
      </div>
      <div>
        <label for="params-debounce">debounce:</label>
        <input type="range" min="0" max="1000" step="1" v-model="params.debounce" id="params-debounce">
        <input type="number" v-model="params.debounce" min="0" max="1000">
      </div>
      <div>
        <h3>Audio features:</h3>
        <button @click="removeAudioFeature">&minus;</button>
        <button @click="addAudioFeature">&plus;</button>
        <div v-for="index in params.features.count">
          <select v-model="params.features.ids[(index - 1)]">
            <option disabled value="">Select feature</option>
            <option>rms</option>
            <option>energy</option>
            <option>zcr</option>
          </select>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
  export default {
    name: 'sidebar',
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
        },
        output: {
          log: true,
          spacebro: {
            address: '',
            port: ''
          },
          file: {
            name: '',
            location: '',
            format: ''
          }
        },
        params: {
          threshold: 0.001,
          debounce: 100,
          features: {
            count: 1,
            ids: ['rms']
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
      },
      removeAudioFeature () {
        if (this.params.features.count > 1) {
          this.params.features.count--
          this.params.features.ids.splice(-1, 1)
        }
      },
      addAudioFeature () {
        this.params.features.count++
      }
    }
  }
</script>

<style scoped>
  .container {
    display: grid;
    grid-template-columns: 1;
    grid-auto-rows: repeat(3, 1fr);
    width: 100%;
    height: 100%;
  }
/*  .sidebar__child {
    grid-column: 1;
  }
  .sidebar__child.sidebar__child--inputs {
    grid-row: 1;
  }
  .sidebar__child.sidebar__child--outputs {
    grid-row: 2;
  }
  .sidebar__child.sidebar__child--params {
    grid-row: 3;
  }*/
  .sidebar__child:not(:last-child) {
    border-bottom: 1px solid #000;
  }
</style>
