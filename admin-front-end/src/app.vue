<template>
  <div id="app">
    <editor />
  </div>
</template>

<script>
import editor from './page/editor/editor'

export default {
  name: 'app',
  components: {
    editor
  }
}
</script>

<style>
body {
  background-color: #000;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
