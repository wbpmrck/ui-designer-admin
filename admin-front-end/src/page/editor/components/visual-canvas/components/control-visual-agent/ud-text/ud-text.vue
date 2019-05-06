<template>
  <udUITwoDimBase :ud-object="udObject" ref="baseComponent" @resize-width-change="widthChange" @resize-height-change="heightChange">
    <div class="ud-text" :style="styleObject">{{udObject.txt().value}}</div>
  </udUITwoDimBase>

  <!-- <div :id="'agent-'+udObject._id().value" class="ud-text" :style="styleObject" @click.stop="selectMe">
    {{udObject.txt().value}}
    <operate-handler-two-dim v-if="udObject === currentSelection"></operate-handler-two-dim>
  </div>-->
</template>

<script>
  // 文本框
  import { mapGetters, mapState } from 'vuex';
  import { UDClipMode, UDTextAlignH, UDTextAlignV } from '../../../../../../../lib/ui-designer/index.js';
  import interact from 'interactjs';
  import SCENE from '../../../../../../../model/ui-scene.js';
  import udUITwoDimBase from '../components/ud-ui-two-dim/ud-ui-two-dim.vue';
  import { translateAlignH, translateAlignV } from '../../../../../../../model/style-transform.js';
  export default {
    name: 'ud-text',
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
          display: 'flex',
          width: this.width + 'px',
          height: this.height + 'px',
          'overflow-x': this.udObject.clipX().value === UDClipMode.CLIP ? 'hidden' : 'scroll',
          'overflow-y': this.udObject.clipY().value === UDClipMode.CLIP ? 'hidden' : 'scroll',
          'background-color': this.udObject.bgColor().value,
          'border-radius': this.udObject.borderRadius().value + 'px',
          'border-width': this.udObject.borderWidth().value + 'px',
          'border-color': this.udObject.borderColor().value,
          'border-style': 'solid',
          'font-family': this.udObject.font().value,
          'font-size': this.udObject.fs().value + 'px',
          color: this.udObject.fontColor().value,
          'font-weight': this.udObject.bold().value ? 'bold' : 'normal',
          'font-style': this.udObject.italic().value ? 'italic' : 'normal',
          'text-decoration': this.udObject.underline().value ? 'underline' : 'none',
          'justify-content': translateAlignH(this.udObject.alignH().value, 'flex'),
          'align-items': translateAlignV(this.udObject.alignV().value),
          'word-break': 'break-all',
          'white-space': 'pre-wrap',
          'line-height': this.udObject.fs().value + this.udObject.ls().value + 'px'
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
  .ud-text {
  }
</style>