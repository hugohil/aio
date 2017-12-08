<template>
  <div class="output container">
    <h2>output</h2>
    <div>
      <label for="output-log">log:</label>
      <input type="checkbox" v-model="log" id="output-log" name="output-log">
    </div>
    <div>
      <h3>Spacebro:</h3>
      <div>
        <label for="output-spacebro">spacebro:</label>
        <input type="checkbox" v-model="realtime" id="output-spacebro" name="output-spacebro">
      </div>
      <label for="output-spacebro-address">address:</label>
      <input type="text" :disabled="realtime" :value="spacebro.address" @input="updateAddress" id="output-spacebro-address" name="output-spacebro-address">
      <br><label for="output-spacebro-port">port:</label>
      <input type="number" :disabled="realtime" :value="spacebro.port" @input="updatePort" min="1000" max="9999" id="output-spacebro-port" name="output-spacebro-port">
    </div>
    <div>
      <h3>File:</h3>
      <div>
        <label for="output-file">file:</label>
        <input type="checkbox" v-model="file" id="output-file" name="output-file">
      </div>
      <label for="output-filepath-name">name:</label>
      <input type="text" :disabled="file" :value="filepath.name" @input="updateName" id="output-filepath-name" name="output-filepath-name">
      <br><label for="output-filepath-folder">folder:</label>
      <input type="file" :disabled="file" webkitdirectory @change="updateFolder" id="output-filepath-folder" name="output-filepath-folder">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'output',
    data () {
      return {}
    },
    computed: {
      log: {
        get: function () {
          return this.$store.state.output.log
        },
        set: function (value) {
          this.$store.commit('UPDATE_LOG', value)
        }
      },
      file: {
        get: function () {
          return this.$store.state.output.filepath.active
        },
        set: function (value) {
          if (value) {
            this.$store.commit('ACTIVATE_FILEPATH')
          } else {
            this.$store.commit('DEACTIVATE_FILEPATH')
          }
        }
      },
      realtime: {
        get: function () {
          return this.$store.state.output.spacebro.active
        },
        set: function (value) {
          if (value) {
            this.$store.dispatch('ACTIVATE_SPACEBRO')
          } else {
            this.$store.dispatch('DEACTIVATE_SPACEBRO')
          }
        }
      },
      spacebro: function () {
        return this.$store.state.output.spacebro
      },
      filepath: function () {
        return this.$store.state.output.filepath
      },
      computing: function () {
        return this.$store.state.audio.computing
      }
    },
    methods: {
      updateAddress ({ target }) {
        this.$store.commit('UPDATE_SPACEBRO_ADDRESS', target.value)
      },
      updatePort ({ target }) {
        this.$store.commit('UPDATE_SPACEBRO_PORT', target.value)
      },
      updateName ({ target }) {
        this.$store.commit('UPDATE_FILEPATH_NAME', target.value)
      },
      updateFolder ({ target }) {
        this.$store.commit('UPDATE_FILEPATH_FOLDER', target.files[0].path)
      }
    }
  }
</script>

<style></style>
