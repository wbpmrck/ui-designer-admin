<template>

      <panel id="property-panel" :class="{'after-tool-expand':isToolBoxExpand}" v-if="currentSelection">
        <div id="property-panel-header">
          <div class="object-name text-ellipsis">{{currentSelection.name().value}}</div>
          <div class="text">的属性</div>
        </div>
      </panel>
    
</template>

<script>

import panel from '../../../../components/panel/panel'
import { mapGetters,mapState } from 'vuex'
import SCENE from '../../../../model/ui-scene.js'

export default {
  name: 'property-panel',
  props: {
  },
  components: {
    panel,
  },
   computed: {
     ...mapState({
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
    })
  },
  data(){
    return {
      SCENE,
      groups:[
        {
          title:'基本信息',
          props:[
            { field:'name'}
          ]
        },
      ]
    }
  },
  methods:{
  
  }
}
</script>

<style lang="scss" scoped>

// 属性面板
#property-panel {    
    position: absolute;
    top: 36px;
    left: 37px;
    width: 260px;
    background: #232323;
    max-height: 100%;
    overflow: hidden;
    z-index: 51;
    transition: initial;
}
// 如果工具箱展开状态
#property-panel.after-tool-expand{
    left: 65px;
}

// 面板顶部
#property-panel-header{
    background-color: #353535;
    color: #b5b5b5;
    font-size: 12px;
    font-weight: 400;
    margin: 0;
    padding: 4px 12px;
    height: 30px;
    min-height: 30px;
    line-height: 22px;

    display: flex;
    flex-direction: row;
    align-items: center;

    // 对象名称
    .object-name {
      display: inline-block;
      max-width: 175px;
      margin-right: 1px;
    }
    .text {
      display: inline-block;
    }
}

</style>
