<template>
  <div class="track column">
    <div class="column__section column__title">
      <h2>track #{{trackIndex}}:</h2>
    </div>
    <div class="column__section track__device">
      <div class="column__section-title">
        <label for="realtime-select"><h3>device:</h3></label>
      </div>
      <div class="column__section-selector track__feature-selector">
        <select v-model="selectedDevice"
          :disabled="computing"
          class="track__device-selector"
          id="realtime-select"
        >
          <option disabled>select device</option>
          <option v-for="(device, index) in devices"
            :key="device.deviceId"
            :value="device.deviceId"
          >{{ device.label }}</option>
        </select>
      </div>
    </div>
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
          <option>rms</option>
          <option>energy</option>
          <option>zcr</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { getDeviceSources } from '@/lib/audio'

export default {
  name: 'track',
  props: {
    trackIndex: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      localdeviceID: {},
      features: {
        available: ['rms', 'energy', 'zcr'],
        selected: ['']
      }
    }
  },
  computed: {
    selectedDevice: {
      get () {
        return this.localdeviceID
      },
      set (deviceID) {
        this.localdeviceID = deviceID
        const index = (this.trackIndex - 1)
        const device = this.devices.find(device => device.deviceId === deviceID)
        this.$store.dispatch('SELECT_DEVICE', { device, index })
      }
    },
    devices () {
      return this.$store.state.audio.devices
    },
    computing () {
      return this.$store.state.audio.computing
    }
  },
  mounted () {
    getDeviceSources().then(devices => { this.$store.commit('INIT_DEVICES', devices) })
  },
  methods: {
    removeAudioFeature () {
      this.features.selected.splice(-1, 1)
      const index = (this.trackIndex - 1)
      this.$store.commit('SELECT_DEVICE', {
        features: this.features.selected,
        index
      })
    },
    addAudioFeature () {
      this.features.selected.push('')
    },
    selectAudioFeature () {
      const index = (this.trackIndex - 1)
      this.$store.commit('UPDATE_FEATURES', {
        features: this.features.selected,
        index
      })
    }
  }
}
</script>

<style>
</style>
