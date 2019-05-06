<template>
  <udUITwoDimBase :ud-object="udObject" ref="baseComponent" @resize-width-change="widthChange" @resize-height-change="heightChange">
    <div class="ud-rect" :style="styleObject"></div>
  </udUITwoDimBase>
</template>

<script>
  /*
                                                                                                                                                                                      矩形
                                                                                                                                                                                      */

  import { mapGetters, mapState } from 'vuex';
  import interact from 'interactjs';
  import SCENE from '../../../../../../../model/ui-scene.js';

  import udUITwoDimBase from '../components/ud-ui-two-dim/ud-ui-two-dim.vue';
  export default {
    name: 'ud-rect',
    // extends: udUITwoDimBase,
    data() {
      return {
        width: 0,
        height: 0
        // offset: {
        //   x: 0,
        //   y: 0
        // },
        // resize: {
        //   w: 0,
        //   h: 0
        // }
      };
    },
    props: {
      ...udUITwoDimBase.props
      // udObject: {
      //   type: Object,
      //   default: {}
      // }
    },
    components: {
      // operateHandlerTwoDim,
      udUITwoDimBase
    },

    computed: {
      // ...mapState({
      //   currentSelection(state) {
      //     return state.selection.currentSelect;
      //   },
      //   currentScene(state) {
      //     return state.selection.scene;
      //   }
      // }),
      // 动态根据配置的数据对象，计算出元素的可视化样式
      styleObject() {
        return {
          display: 'inline-block',
          width: this.width + 'px',
          height: this.height + 'px',
          // 'margin-top': this.udObject.marginTop().value + 'px',
          // 'margin-right': this.udObject.marginRight().value + 'px',
          // 'margin-left': this.udObject.marginLeft().value + 'px',
          // 'margin-bottom': this.udObject.marginBottom().value + 'px',
          'background-color': this.udObject.bgColor().value,
          'border-radius': this.udObject.borderRadius().value + 'px',
          'border-width': this.udObject.borderWidth().value + 'px',
          'border-color': this.udObject.borderColor().value,
          'border-style': 'solid'
        };
      }
    },
    methods: {
      widthChange(newVal, oldVal) {
        this.width = newVal;
      },
      heightChange(newVal, oldVal) {
        this.height = newVal;
      }
    },
    created() {
      this.width = this.udObject.w().value;
      this.height = this.udObject.h().value;
    },

    beforeDestroy() {},
    watch: {},
    mounted() {}
  };
</script>

<style lang="scss" scoped>
  .ud-rect {
  }
</style>