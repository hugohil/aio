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
  </div>
</template>

<script>
export default {
  name: 'settings',
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
