<template>
  <div class="output container">
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
</template>

<script>
  export default {
    name: 'output',
    data () {
      return {
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
    methods: {}
  }
</script>

<style></style>
