<template>
  <div id="tool-box" :class="{expand:isExpand}">
    <div id="tool-box-header">
      <button @click="toggleExpand" class="icon-4 toggle-expand btn-clear" :title="isExpand?'点击折叠':'点击展开'"></button>
    </div>
    <div id="tool-list" class="scrollable-1">
      <div class="tool-group" v-for="group in toolListGroup" :key="group.name">
        <div class="group-name">{{group.name}}</div>
        <el-tooltip
          effect="light"
          :content="tool.desc"
          placement="bottom"
          v-for="tool in group.tools"
          :key="tool.name"
          :open-delay="1000"
          popper-class="ud-tool-tip"
        >
          <div class="tool-item pressable" :class="{active:currentScene===SCENE.TOOL_BOX && currentSelectTool===tool.name}">
            <component :is="tool.def" :name="tool.name"></component>
          </div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
  import uiContainerRow from './components/ui-container-row/ui-container-row.vue';
  import udTextarea from './components/textarea/textarea';
  import udInput from './components/input/input';
  import udText from './components/text/text';
  import udLine from './components/line/line';
  import udCircle from './components/circle/circle';
  import rectangle from './components/rectangle/rectangle';
  import toolImage from './components/image/image';
  import toolPage from './components/page/page';
  import uiContainerAbsolute from './components/ui-container-absolute/ui-container-absolute';
  import { mapGetters, mapState } from 'vuex';
  import SCENE from '../../../../model/ui-scene.js';

  export default {
    name: 'tool-box',
    props: {},
    components: {
      rectangle,
      udTextarea,
      udInput,
      udLine,
      udText,
      udCircle,
      toolImage,
      toolPage,
      uiContainerRow,
      uiContainerAbsolute
    },
    computed: {
      ...mapState({
        currentSelection(state) {
          return state.selection.currentSelect;
        },
        currentSelectTool(state) {
          return state.selection.currentSelectTool;
        },
        isExpand(state) {
          return state.editor.toolBox.isExpand;
        },
        currentScene(state) {
          return state.selection.scene;
        }
      })
    },
    data() {
      return {
        SCENE,
        // toolList:[
        //   {name:'rectangle',def:rectangle,desc:'矩形'},
        //   {name:'tool-image',def:toolImage,desc:'图片'},
        //   {name:'tool-page',def:toolPage,desc:'页面'},
        //   {name:'uiContainerAbsolute',def:uiContainerAbsolute,desc:'区块容器'},
        // ],
        toolListGroup: [
          {
            name: '容器类',
            tools: [
              { name: 'tool-page', def: toolPage, desc: '页面' },
              { name: 'uiContainerAbsolute', def: uiContainerAbsolute, desc: '绝对定位容器' },
              { name: 'uiContainerRow', def: uiContainerRow, desc: '行容器' }
            ]
          },
          {
            name: '基础图形类',
            tools: [
              { name: 'rectangle', def: rectangle, desc: '矩形' },
              { name: 'udCircle', def: udCircle, desc: '圆形' },
              { name: 'udLine', def: udLine, desc: '直线' }
            ]
          },
          {
            name: '页面元素类',
            tools: [{ name: 'tool-image', def: toolImage, desc: '图片' }, { name: 'tool-udText', def: udText, desc: '文本' }]
          },
          {
            name: '用户输入类',
            tools: [
              { name: 'tool-ud-input', def: udInput, desc: '单行输入' },
              { name: 'tool-ud-multi-input', def: udTextarea, desc: '多行输入' }
            ]
          }
        ]
      };
    },
    methods: {
      toggleExpand() {
        console.log('toggleExpand');
        // this.isExpand = !this.isExpand;
        this.$store.commit('setToolBoxState', {
          name: 'isExpand',
          value: !this.isExpand
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  // 工具箱
  #tool-box {
    position: fixed;
    left: 0;
    bottom: 0;
    top: 37px;
    width: 37px;
    border-right: 1px solid #151515;
    background-color: #353535;
    z-index: 120;
    // 工具箱头部
    #tool-box-header {
      background-color: #2d2d2d;
      border-bottom: 1px solid #262626;
      height: 11px;
      .toggle-expand {
        border: none;
        width: 20px;
        height: 11px;
        background-position: -30px 0;
      }
      .toggle-expand:hover {
        background-position: -30px -20px;
      }
    }
    // 工具箱列表
    #tool-list {
      height: 100%;
      padding-left: 2px;
      padding-right: 2px;
      padding-top: 4px;
      padding-bottom: 4px;
      text-align: left;

      // 工具箱分组
      .tool-group {
        display: inline-block;
        position: relative;
        width: 100%;
        height: auto;
        border-bottom: 1px solid #2a2a2a;
        .group-name {
          position: absolute;
          display: inline-block;
          border: solid 1px #5b5b5b;
          left: 65px;
          top: 0;
          white-space: nowrap;
          max-width: 100px;
          padding: 10px;
          background-color: #262626;
          visibility: hidden;
        }
      }
      .tool-group:hover {
        .group-name {
          visibility: visible;
        }
      }
      .tool-item {
        display: inline-block;
        position: relative;
        width: 18px;
        height: 18px;
        // padding: 5px;
        margin: 5px;
        opacity: 0.6;
        .disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
      }
      .tool-item:hover {
        opacity: 1;
      }
      .tool-item.active {
        opacity: 1;
        background-color: #282828 !important;
      }
    }
  }
  #tool-box.expand {
    width: 65px;
    #tool-box-header .toggle-expand {
      background-position: 0px 0;
    }
    #tool-box-header .toggle-expand:hover {
      background-position: 0px -20px;
    }
  }
</style>
