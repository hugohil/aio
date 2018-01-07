<template>
  <div id="wrapper">
    <header class="aio__header">
      <h1>a.io</h1>
    </header>
    <main>
      <aio-settings></aio-settings>
      <aio-track v-for="index in tracks"
        :trackIndex="index"
        :key="index"
      ></aio-track>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'aio',
    components: {
      'aio-settings': require('@/components/Settings').default,
      'aio-track': require('@/components/Track').default
    },
    data () {
      return {
        tracks: 1
      }
    },
    methods: {}
  }
</script>

<style>
.aio__header {
  margin: 0.5em 1em;
  font-weight: bold;
  letter-spacing: 0.1em;
}
</style>
