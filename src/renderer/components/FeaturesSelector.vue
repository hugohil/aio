<template>
  <div class="column__section track__features">
    <div class="column__section-title">
      <h3>audio features:</h3>
    </div>
    <div class="column__section-controls track__features-controls">
      <button :disabled="computing || features.selected.length < 2"
        @click="removeAudioFeature"
      >&minus;</button>
      <button :disabled="computing || features.selected.length >= features.available.length"
        @click="addAudioFeature"
      >&plus;</button>
    </div>
    <div class="column__section-selector track__feature-selector"
      v-for="index in features.selected.length"
    >
      <select :disabled="computing"
        v-model="features.selected[(index - 1)]"
        @change="selectAudioFeature"
      >
        <option disabled>select feature</option>
        <option v-for="feature in features.available">{{feature}}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'aio-features-selector',
  props: {
    computing: {
      type: Boolean
    },
    trackIndex: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      features: {
        available: ['rms', 'energy', 'chroma'],
        selected: ['']
      }
    }
  },
  computed: {
    index () {
      return (this.trackIndex - 1)
    }
  },
  methods: {
    removeAudioFeature () {
      this.features.selected.splice(-1, 1)
      this.$store.commit('SELECT_DEVICE', {
        features: this.features.selected,
        index: this.index
      })
    },
    addAudioFeature () {
      this.features.selected.push('')
    },
    selectAudioFeature () {
      this.$store.commit('UPDATE_FEATURES', {
        features: this.features.selected,
        index: this.index
      })
    }
  }
}
</script>

<style>
</style>
