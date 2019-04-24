<template>
  <div class="image" :class="{disabled:disable}" @click="clickMe"></div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex';
  import SCENE from '../../../../../../model/ui-scene.js';
  import { isInstanceOf } from '../../../../../../lib/utils/oop.js';
  import { UDImage, UDUIContainer, UDPage } from '../../../../../../lib/ui-designer/index.js';
  export default {
    name: 'tool-image', //FIXME:加tool前缀是考虑到vue不推荐使用内置的关键字image做组件名称
    props: [],
    // props: ['itemData'],
    data() {
      return {};
    },
    computed: {
      ...mapState({
        currentSelection(state) {
          return state.selection.currentSelect;
        },
        currentScene(state) {
          return state.selection.scene;
        }
      }),
      disable() {
        if (
          //  (this.currentScene=== SCENE.OBJECT_TREE && this.currentSelection && this.currentSelection.children) || //当选择对象树，且当前选择的对象可以有孩子的时候
          (this.currentScene === SCENE.OBJECT_TREE && isInstanceOf(this.currentSelection, UDUIContainer)) || //当选择对象树，且当前选择的对象是 ud-container 的时候（也就是可视化的容器）
          (this.currentScene === SCENE.OBJECT_TREE && isInstanceOf(this.currentSelection, UDPage)) || //当选择对象树，且当前选择的对象是 ud-container 的时候（也就是可视化的容器）
          (this.currentScene === SCENE.TOOL_BOX && this.currentSelectTool === this.name) //当选择的是工具箱，且当前选择的工具就是自己的时候
        ) {
          return false;
        } else {
          return true;
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
        // 一个图片
        let me = new UDImage();
        me.name({ value: '图片' + sliblingCount });
        me.w({ value: 100 });
        me.h({ value: 100 });
        me.lockRatio({ value: true });

        me.url({
          value:
            'data:image/png;base64,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'
        });

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
  .image {
    display: inline-block;
    width: 100%;
    height: 100%;
    background: url(./assets/img/image.svg) no-repeat;
  }
</style>
