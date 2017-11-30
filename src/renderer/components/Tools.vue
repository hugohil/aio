<template>
  <div class="tools__container">
    <h2>tools</h2>
    <div>
      <h3>Computing:</h3>
      <button
        @click="toggleComputing"
      ><i class="material-icons icon--button">{{computing ? 'stop' : 'swap_horiz' }}</i></button>
    </div>
    <div>
      <h3>Settings:</h3>
      <div>
        <label for="tools-threshold">threshold:</label>
        <input type="range" min="0" max="1" step="0.001" v-model="threshold" id="tools-threshold">
        <input type="number" v-model="threshold" min="0" max="1" step="0.001">
      </div>
      <div>
        <label for="tools-debounce">debounce:</label>
        <input type="range" min="0" max="1000" step="1" v-model="debounce" id="tools-debounce">
        <input type="number" v-model="debounce" min="0" max="1000">
    </div>
    </div>
    <div>
      <h3>Audio features:</h3>
      <button @click="removeAudioFeature">&minus;</button>
      <button @click="addAudioFeature">&plus;</button>
      <div v-for="index in features.count">
        <select v-model="features.ids[(index - 1)]">
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
    name: 'tools',
    data () {
      return {
        threshold: 0.001,
        debounce: 100,
        features: {
          count: 1,
          ids: ['rms']
        }
      }
    },
    computed: {
      computing () {
        return this.$store.state.audio.computing
      }
    },
    methods: {
      toggleComputing () {
        this.$store.dispatch(this.computing ? 'STOP_ANALYZERS' : 'START_ANALYZERS')
      },
      removeAudioFeature () {
        if (this.features.count > 1) {
          this.features.count--
          this.features.ids.splice(-1, 1)
        }
      },
      addAudioFeature () {
        this.features.count++
      }
    }
  }
</script>

<style></style>
