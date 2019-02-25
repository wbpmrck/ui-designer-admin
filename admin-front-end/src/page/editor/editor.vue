<template>
  <div id="editor">
      <top-bar></top-bar>
      <tool-box></tool-box>
      <property-panel></property-panel>
      <right-panel></right-panel>
  </div>
</template>

<script>
import topBar from './components/top-bar/top-bar'
import rightPanel from './components/right-panel/right-panel'
import toolBox from './components/tool-box/tool-box'
import propertyPanel from './components/property-panel/property-panel'
export default {
  name: 'editor',
  components: {
    topBar,
    rightPanel,
    toolBox,
    propertyPanel,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
