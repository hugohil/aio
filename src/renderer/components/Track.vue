<template>
  <div class="track column">
    <div class="column__section column__title">
      <h2>track #{{trackIndex}}:</h2>
    </div>
    <aio-device-selector :trackIndex="trackIndex" :computing="computing"></aio-device-selector>
    <aio-features-selector :trackIndex="trackIndex" :computing="computing"></aio-features-selector>
  </div>
</template>

<script>
export default {
  name: 'aio-track',
  components: {
    'aio-features-selector': require('@/components/FeaturesSelector').default,
    'aio-device-selector': require('@/components/DeviceSelector').default
  },
  props: {
    trackIndex: {
      type: Number,
      required: true
    }
  },
  computed: {
    computing () {
      return this.$store.state.audio.computing
    }
  }
}
</script>

<style>
</style>
