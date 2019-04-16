<template>
    <div class="image"  :class="{disabled:disable}"  @click="clickMe">
     
    </div>
</template>

<script>

import { mapGetters,mapState } from 'vuex'
import SCENE from '../../../../../../model/ui-scene.js'
import {isInstanceOf} from '../../../../../../lib/utils/oop.js'
import {UDImage,UDUIContainer,UDPage} from '../../../../../../lib/ui-designer/index.js'
export default {
  name: 'tool-image', //FIXME:加tool前缀是考虑到vue不推荐使用内置的关键字image做组件名称
  props: [],
  // props: ['itemData'],
  data(){
    return {
    }
  },
   computed: {
     ...mapState({
      currentSelection (state) {
        return state.selection.currentSelect
      },
      currentScene (state) {
        return state.selection.scene
      }
    }),
    disable(){
      if(
        
        //  (this.currentScene=== SCENE.OBJECT_TREE && this.currentSelection && this.currentSelection.children) || //当选择对象树，且当前选择的对象可以有孩子的时候
         (this.currentScene=== SCENE.OBJECT_TREE && isInstanceOf(this.currentSelection,UDUIContainer) ) || //当选择对象树，且当前选择的对象是 ud-container 的时候（也就是可视化的容器）
         (this.currentScene=== SCENE.OBJECT_TREE && isInstanceOf(this.currentSelection,UDPage) ) || //当选择对象树，且当前选择的对象是 ud-container 的时候（也就是可视化的容器）
         (this.currentScene=== SCENE.TOOL_BOX && this.currentSelectTool === this.name) //当选择的是工具箱，且当前选择的工具就是自己的时候
      ){
        return false;
      }else{
        return true;
      }
    }
  },
  methods:{

    clickMe(){
      if(this.disable){
        return; //如果当前不可使用，则不处理点击事件
      }
      // FIXME:当前工具箱不占据选择状态(虽然store里预留了)。这样比较方便

      // 一个图片
      let url1 = new UDImage();
      url1.name({value:'图片'});

      // 添加并且选中对象。这种方式可能不方便连续添加对象
      // this.$store.dispatch('addObjectAndSelectIt',{
      //   object:url1,
      //   parent:this.currentSelection,
      //   scene:SCENE.OBJECT_TREE,
      // });

      //添加对象，保持当前选择的容器不变
      this.$store.commit('addObject',{
        object:url1,
        parent:this.currentSelection,
      });
    },
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>

.image {
    display: inline-block;
    width: 100%;
    height: 100%;
    background: url(./assets/img/image.svg) no-repeat;
}

</style>
