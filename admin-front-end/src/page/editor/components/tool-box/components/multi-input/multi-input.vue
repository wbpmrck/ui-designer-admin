<template>
  <div class="multi-input" :class="{disabled:disable}" @click="clickMe"></div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex';
  import SCENE from '../../../../../../model/ui-scene.js';
  import { isInstanceOf } from '../../../../../../lib/utils/oop.js';
  import { UDStage, UDUIContainer, UDMultiInput, UDPage } from '../../../../../../lib/ui-designer/index.js';
  export default {
    name: 'multi-input',
    props: [],
    props: ['name'],
    data() {
      return {};
    },
    computed: {
      ...mapState({
        stage(state) {
          return state.stage.stage;
        },
        currentSelection(state) {
          return state.selection.currentSelect;
        },
        currentSelectTool(state) {
          return state.selection.currentSelectTool;
        },
        currentScene(state) {
          return state.selection.scene;
        }
      }),

      //给出什么时候不可点击
      disable() {
        if (
          //  (this.currentScene=== SCENE.OBJECT_TREE && this.currentSelection && this.currentSelection.children) || //当选择对象树，且当前选择的对象可以有孩子的时候
          (this.currentScene === SCENE.OBJECT_TREE && isInstanceOf(this.currentSelection, UDUIContainer)) || //当选择对象树，且当前选择的对象是 ud-container 的时候（也就是可视化的容器）
          (this.currentScene === SCENE.OBJECT_TREE && isInstanceOf(this.currentSelection, UDPage)) || //当选择对象树，且当前选择的对象是 ud-container 的时候（也就是可视化的容器）
          (this.currentScene === SCENE.TOOL_BOX && this.currentSelectTool === this.name) //当选择的是工具箱，且当前选择的工具就是自己的时候
        ) {
          return false; //返回可以使用
        } else {
          return true; //返回不可使用
        }
      }
    },
    methods: {
      clickMe() {
        if (this.disable) {
          return; //如果当前不可使用，则不处理点击事件
        }
        // FIXME:当前工具箱不占据选择状态(虽然store里预留了)。这样比较方便

        let sliblingCount = this.currentSelection.children().value.length + 1;
        // 一个矩形
        let me = new UDMultiInput();
        me.x({ value: 50 });
        me.y({ value: 50 });
        me.w({ value: 250 });
        me.h({ value: 50 });
        me.name({ value: '多行输入框' + sliblingCount });

        // 添加并且选中对象。这种方式可能不方便连续添加对象
        // this.$store.dispatch('addObjectAndSelectIt',{
        //   object:me,
        //   parent:this.currentSelection,
        //   scene:SCENE.OBJECT_TREE,
        // });

        //添加对象，保持当前选择的容器不变
        this.$store.commit('addObject', {
          object: me,
          parent: this.currentSelection
        });
      }
    },
    created() {}
  };
</script>

<style lang="scss" scoped>
  .multi-input {
    display: inline-block;
    width: 100%;
    height: 100%;
    background: url(./assets/img/textarea.svg) no-repeat;
  }
</style>
