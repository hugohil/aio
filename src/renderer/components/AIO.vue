<template>
  <div id="wrapper">
    <header><h1>a.io</h1></header>
    <main>
      <aio-inputs></aio-inputs>
      <aio-tools></aio-tools>
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
      'aio-tools': require('@/components/Tools').default,
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
    background: #FFF;
    font-family: monospace;
  }
  h1 {
    font-weight: 700;
  }
  header {
    border-bottom: 1px solid #000;
    padding: .3em;
  }
  #wrapper main {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
  }
  #wrapper main > div {
    border-left: 1px solid #000;
    border-top: 1px solid #000;
    box-sizing: border-box;
    min-width: 50%;
    height: 50%;
    margin: 0;
    padding: .3em;
  }
  #wrapper main > div:nth-child(odd) {
    border-left: none;
  }
</style>
