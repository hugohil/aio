<template>
  <div id="wrapper">
    <header>a.io</header>
    <main>
      <aio-inputs></aio-inputs>
      <aio-params></aio-params>
      <aio-visualizer></aio-visualizer>
      <aio-output></aio-output>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'aio',
    components: {
      'aio-inputs': require('@/components/Inputs').default,
      'aio-params': require('@/components/Params').default,
      'aio-visualizer': require('@/components/Visualizer').default,
      'aio-output': require('@/components/Output').default
    },
    methods: {}
  }
</script>

<style>
  #wrapper {
    width: 100vw;
    height: 100vh;
  }
  header {
    border-bottom: 1px solid #000;
    padding: .3em;
  }
  #wrapper main {
    display: flex;
    height: 100%;
  }
  #wrapper main > div {
    border-left: 1px solid #000;
    box-sizing: border-box;
    width: 25%;
    height: 100%;
    margin: 0;
    padding: .3em;
    display: inline-block;
  }
  #wrapper main > div:first-child {
    border-left: none;
  }
</style>
