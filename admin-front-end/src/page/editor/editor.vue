<template>
  <div id="editor">
      <top-bar></top-bar>
      <rightPannel></rightPannel>
  </div>
</template>

<script>
import topBar from './components/top-bar/top-bar'
import rightPannel from './components/right-panel/right-panel'
export default {
  name: 'editor',
  components: {
    topBar,
    rightPannel,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
