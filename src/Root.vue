<template>
  <div class="root">
    <h1>a.io</h1>
  </div>
</template>

<script>
'use strict'

var settings = require('electron').remote.getGlobal('settings') // Global variable set in mainProcess

export default {
  data () {
    return {}
  },
  mounted() {}
}
</script>
<style>
html {
  height: 100%;
  background: #E1E1E1;
  font-family: Source Sans Pro, Helvetica, sans-serif;
}

#app {
  color: #2c3e50;
  max-width: 600px;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}
#app p {
  margin-left: auto;
  margin-right: auto;
  max-width: 600px;
}

#app > div {
  position: absolute;
  width: 100%;
}
</style>
