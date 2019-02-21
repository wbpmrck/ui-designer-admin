<template>
    <div class="rectangle" :class="{disabled:disable}" @click="selectMe">
     
    </div>
</template>

<script>

import { mapGetters,mapState } from 'vuex'
import SCENE from '../../../../../../model/ui-scene.js'
import {UDStage,UDUIContainer,UDRectangle} from '../../../../../../lib/ui-designer/index.js'
export default {
  name: 'rectangle',
  props: [],
  props: ['name'],
  data(){
    return {
    }
  },
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
      currentScene (state) {
        return state.selection.scene
      }
    }),
    disable(){
      if(
         (this.currentScene=== SCENE.OBJECT_TREE && this.currentSelection && this.currentSelection.children) ||
         (this.currentScene=== SCENE.TOOL_BOX && this.currentSelectTool === this.name)
      ){
        return false;
      }else{
        return true;
      }
    }
  },
  methods:{
    selectMe(){
      //TODO: 原来这里是【提交修改场景+选择对象的请求】。但是考虑到多步骤添加工具比较复杂，目前不实现
      // this.$store.commit('selectToolItem',{
      //   item:this.name,
      //   scene:SCENE.TOOL_BOX
      // });

      // FIXME:当前工具箱不占据选择状态(虽然store里预留了)。这样比较方便

      // 一个矩形
      let rect1 = new UDRectangle();
      rect1.x({value:20});
      rect1.y({value:30});
      rect1.name({value:'rect new '});
      this.stage.addChild(rect1);

    }
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>

.rectangle {
    display: inline-block;
    width: 100%;
    height: 100%;
    background: url(./assets/img/rect.svg) no-repeat;
}

</style>
