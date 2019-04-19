<template>
  <div id="editor">
      <top-bar></top-bar>
      <visual-canvas v-if="currentPage" ></visual-canvas>
      <tool-box></tool-box>
      <property-panel></property-panel>
      <right-panel></right-panel>
  </div>
</template>

<script>
import topBar from './components/top-bar/top-bar'
import visualCanvas from './components/visual-canvas/visual-canvas'
import rightPanel from './components/right-panel/right-panel'
import toolBox from './components/tool-box/tool-box'
import propertyPanel from './components/property-panel/property-panel'
import {isInstanceOf} from '../../lib/utils/oop.js'
import {UDPage} from '../../lib/ui-designer/index.js'
import { mapGetters,mapState } from 'vuex'
export default {
  name: 'editor',
    computed: {
        ...mapState({
        stage (state) {
        return state.stage.stage
        },
        currentSelection (state) {
            return state.selection.currentSelect
        },
        currentSelectTool (state) {
            return state.selection.currentSelectTool
        },
        isToolBoxExpand (state) {
            return state.editor.toolBox.isExpand
        },
        currentScene (state) {
            return state.selection.scene
        }
        }),
        currentPage(){
            let cp;
            if(this.currentSelection ){
                //看当前是否选择的是页面
                if( isInstanceOf(this.currentSelection,UDPage)){
                    cp = this.currentSelection
                }else{
                    //一直向上查找元素所在的页面
                    let p = this.currentSelection.parent;
                    while(p && !isInstanceOf(p,UDPage)){
                        p = p.parent
                    }
                    cp = p;
                }
            }else{
                cp = undefined
            }
            return cp;
        }
    },
  components: {
    topBar,
    visualCanvas,
    rightPanel,
    toolBox,
    propertyPanel,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
