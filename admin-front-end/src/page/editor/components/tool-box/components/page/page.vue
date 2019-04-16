<template>
    <div class="tool-page" :class="{disabled:disable}" @click="clickMe">
     
    </div>
</template>

<script>

import { mapGetters,mapState } from 'vuex'
import SCENE from '../../../../../../model/ui-scene.js'
import {isInstanceOf} from '../../../../../../lib/utils/oop.js'
import {UDStage,UDUIContainer,UDPage} from '../../../../../../lib/ui-designer/index.js'
export default {
  name: 'tool-page',
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

    //给出什么时候不可点击
    disable(){
      if(
         (this.currentScene=== SCENE.OBJECT_TREE && isInstanceOf(this.currentSelection,UDStage) ) || //当选择对象树，且当前选择的对象是 舞台的时候
         (this.currentScene=== SCENE.TOOL_BOX && this.currentSelectTool === this.name) //当选择的是工具箱，且当前选择的工具就是自己的时候
      ){
        return false; //返回可以使用
      }else{
        return true; //返回不可使用
      }
    }
  },
  methods:{
    clickMe(){
      if(this.disable){
        return; //如果当前不可使用，则不处理点击事件
      }
      // FIXME:当前工具箱不占据选择状态(虽然store里预留了)。这样比较方便

      // 一个新页面
      // 从当前上下文获取一些比较友好的初始化参数
      let me = new UDPage();
      me.name({value:'页面'});

      //添加对象，保持当前选择的容器不变
      this.$store.commit('addObject',{
        object:me,
        parent:this.currentSelection,
      });
    },
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>

.tool-page {
    display: inline-block;
    width: 100%;
    height: 100%;
    background: url(./assets/img/page.svg) no-repeat;
}

</style>
