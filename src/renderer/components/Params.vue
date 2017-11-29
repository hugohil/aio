<template>
  <div class="params__container">
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
</template>

<script>
  export default {
    name: 'params',
    data () {
      return {
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

<style></style>
