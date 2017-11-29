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
        <button @click="addFileInput">Add file track</button>
        <button @click="removeFileInput">Remove file track</button>
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
