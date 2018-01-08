<template>
  <div class="column__section track__device">
    <div class="column__section-title">
      <label for="realtime-select"><h3>device:</h3></label>
    </div>
    <div class="column__section-selector track__feature-selector">
      <select v-model="selectedDeviceID"
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
</template>

<script>
import { getDeviceSources } from '@/lib/audio'

export default {
  name: 'aio-device-selector',
  props: {
    computing: {
      type: Boolean
    },
    trackIndex: {
      type: Number,
      required: true
    }
  },
  mounted () {
    getDeviceSources().then(devices => { this.$store.commit('INIT_DEVICES', devices) })
  },
  data () {
    return {
      localdeviceID: {}
    }
  },
  computed: {
    selectedDeviceID: {
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
    device () {
      return this.devices.find(device => device.deviceId === this.selectedDeviceID)
    },
    devices () {
      return this.$store.state.audio.devices
    }
  }
}
</script>

<style>
</style>
