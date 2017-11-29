<template>
  <div id="wrapper">
    <aio-sidebar></aio-sidebar>
    <aio-main></aio-main>
    <aio-actions></aio-actions>
  </div>
</template>

<script>
  export default {
    name: 'aio',
    components: {
      'aio-main': require('@/components/Main').default,
      'aio-sidebar': require('@/components/Sidebar').default,
      'aio-actions': require('@/components/Actions').default
    },
    methods: {}
  }
</script>

<style>
  #wrapper {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-auto-rows: repeat(12, 1fr);
    width: 100vw;
    height: 100vh;
  }
  #wrapper > * {
    border: 1px solid #000;
    box-sizing: border-box;
  }
  .sidebar {
    grid-column: 1 / 4;
    grid-row: 1 / 12;
  }
  .main {
    grid-column: 4 / end-line;
    grid-row: 1 / 12;
  }
  .actions {
    grid-column: 1 / end-line;
    grid-row: 12;
  }
</style>
