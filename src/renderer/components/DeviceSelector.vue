<template>
  <div class="column__section track__device">
    <div class="column__section-title">
      <label for="realtime-select"><h3>device:</h3></label>
    </div>
    <div class="column__section-selector track__device-selector">
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
    <!-- channel selection is temporarly disable until
    https://github.com/meyda/meyda/pull/226
    is approved -->
<!--     <div class="column__section-selector track__device-selector">
      <select v-model="channel"
        :disabled="computing"
        @change="setChannel"
        class="track__device-selector"
        id="realtime-select"
      >
        <option disabled>select channel</option>
        <option v-for="channel in analyzer.inputs"
          :key="channel"
          :value="(channel - 1)"
        >{{ (channel - 1) }}</option>
      </select>
    </div> -->
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
    getDeviceSources().then(devices => {
      this.$store.commit('INIT_DEVICES', devices)
      const defaultDevice = devices[0]
      this.$store.dispatch('SELECT_DEVICE', { device: defaultDevice, index: this.index })
      this.localdeviceID = defaultDevice.deviceId
    })
  },
  data () {
    return {
      localdeviceID: {},
      channel: ''
    }
  },
  computed: {
    index () {
      return (this.trackIndex - 1)
    },
    selectedDeviceID: {
      get () {
        return this.localdeviceID
      },
      set (deviceID) {
        this.localdeviceID = deviceID
        const device = this.devices.find(device => device.deviceId === deviceID)
        this.$store.dispatch('SELECT_DEVICE', { device, index: this.index })
      }
    },
    device () {
      return this.devices.find(device => device.deviceId === this.selectedDeviceID)
    },
    devices () {
      return this.$store.state.audio.devices
    },
    analyzer () {
      return this.$store.state.audio.analyzers[this.index]
        ? this.$store.state.audio.analyzers[this.index]._m
        : { channelCount: 0 }
    },
    analyzers () {
      return this.$store.state.audio.analyzers
    }
  },
  methods: {
    setChannel ({ target }) {
      const channel = Number(target.value)
      this.$store.dispatch('SELECT_CHANNEL', { channel, index: this.index })
    }
  }
}
</script>

<style>
</style>
