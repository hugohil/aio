<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  @import './style/css/reset';
  @import './style/css/kiosk';
  @import './style/css/material-icons';
  /* CSS */

  /*
    background: #1F1F1F
    color: #D3D3D3
    highlight: #505050
    shadow: #191919
  */

  body {
    font-family: monospace;
    background: #1F1F1F;
    color: #D3D3D3;
    height: 100vh;
    overflow-x: scroll;
  }
  #app, #wrapper {
    height: 100%;
  }
  main {
    height: 100%;
    display: flex;
  }
  .column {
    display: inline-block;
    height: 50%;
    width: 30%;
    min-width: 270px;
    max-width: 500px;
    margin: 0.5em 1em 0.5em 0;
    padding: 0.75em 1em;
    border-radius: 0.25em;
    border: 1px solid #505050;
    box-shadow: 0 0.5em 0.5em #191919;
  }
  .column:first-child {
    margin-left: 1em;
  }
  .column__title {
    font-size: 1.25em;
    font-weight: bold;
    letter-spacing: 0.2em;
  }
  .column__section {
    padding-bottom: 0.5em;
  }
  .column__section:not(:first-child) {
    border-top: 1px solid #505050;
    padding-top: 0.5em;
  }
  .column__section-title {
    font-size: 1em;
    letter-spacing: 0.1em;
    margin-bottom: 0.5em;
  }
  .column__section-controls, .column__section-selector {
    margin: 0.5em 0;
  }
  .column__section-content--inline > div {
    display: inline-block;
  }
  label, button {
    cursor: pointer;
  }
</style>
