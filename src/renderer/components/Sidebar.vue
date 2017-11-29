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
