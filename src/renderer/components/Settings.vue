<template>
  <div class="settings column">
    <div class="column__section column__title">
      <h2>settings:</h2>
    </div>
    <div class="column__section column__section-content--inline settings__compute">
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
    <div class="column__section settings__threshold">
      <div class="column__section-title">
        <label for="spacebro-address"><h3>spacebro address:</h3></label>
      </div>
      <div class="column__section-controls">
        <input type="text"
          v-model="sbAddress"
          id="spacebro-address"
        >
      </div>
    </div>
    <div class="column__section settings__threshold">
      <div class="column__section-title">
        <label for="spacebro-port"><h3>spacebro port:</h3></label>
      </div>
      <div class="column__section-controls">
        <input type="number"
          v-model="sbPort"
          id="spacebro-port"
        >
      </div>
    </div>
    <div class="column__section column__section-content--inline settings__compute">
      <div class="column__section-title">
        <h3>connection:</h3>
      </div>
      <div class="column__section-controls">
        <button @click="connectSB">{{sbConnected ? 'dis' : ''}}connect spacebro</button>
      </div>
    </div>
  </div>
</template>

<script>
import settings from '@/lib/settings'

export default {
  name: 'aio-settings',
  data () {
    return {
      sbConnected: false
    }
  },
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
    },
    sbAddress: {
      get () {
        return this.$store.state.spacebro.address
      },
      set (address) {
        this.$store.dispatch('UPDATE_SBADDRESS', address)
      }
    },
    sbPort: {
      get () {
        return this.$store.state.spacebro.port
      },
      set (port) {
        this.$store.dispatch('UPDATE_SBPORT', port)
      }
    }
  },
  methods: {
    connectSB () {
      !this.sbConnected && this.$store.commit('CONNECT_SB')
      this.sbConnected && this.$store.commit('DISCONNECT_SB')
      this.sbConnected = !this.sbConnected
    }
  },
  mounted () {
    setTimeout(() => {
      this.computing = settings.audio.autoCompute
    }, 1500)
  }
}
</script>

<style>
</style>
