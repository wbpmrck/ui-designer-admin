<template>
  <div id="editor">
      <top-bar></top-bar>
      <tool-box></tool-box>
      <right-pannel></right-pannel>
  </div>
</template>

<script>
import topBar from './components/top-bar/top-bar'
import rightPannel from './components/right-panel/right-panel'
import toolBox from './components/tool-box/tool-box'
export default {
  name: 'editor',
  components: {
    topBar,
    rightPannel,
    toolBox,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
