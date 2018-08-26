<template>
  <div class="settings column">
    <div class="column__section column__title">
      <h2>settings:</h2>
    </div>
    <div class="column__section settings__compute">
      <div class="column__section-content--inline">
        <div class="column__section-title">
          <label for="computing-checkbox"><h3>computing:</h3></label>
        </div>
        <div class="column__section-controls">
          <input type="checkbox"
            v-model="computing"
            id="computing-checkbox"
          >
        </div>
      </div>
    </div>
    <div class="column__section settings__threshold">
      <div class="column__section-title">
        <label for="threshold-range"><h3>threshold ({{threshold}}):</h3></label>
      </div>
      <div class="column__section-controls">
        <input type="range"
          min=".00" max="1.00" step="0.005"
          v-model="threshold"
          id="threshold-range"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'aio-settings',
  computed: {
    devices () {
      return this.$store.state.audio.devices
    },
    computing: {
      get () {
        return this.$store.state.audio.computing
      },
      set (computing) {
        this.$store.dispatch(computing ? 'START_ANALYZERS' : 'STOP_ANALYZERS')
      }
    },
    threshold: {
      get () {
        return this.$store.state.audio.threshold
      },
      set (threshold) {
        this.$store.dispatch('UPDATE_THRESHOLD', threshold)
      }
    }
  },
  methods: {
    updateThreshold ({ target }) {
      this.$store.commit('UPDATE_THRESHOLD', target.value)
    }
  }
}
</script>

<style>
</style>
