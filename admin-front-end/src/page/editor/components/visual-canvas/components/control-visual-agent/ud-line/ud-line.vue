<template>
  <div :id="'agent-'+udObject._id().value" class="ud-line" :style="wrapperStyle" @click.stop="selectMe">
    <svg style="width:100%;height:100%;position:absolute;left:0;top:0;right:0;bottom:0;" :stroke="svgStyle['color']" :stroke-width="svgStyle['stroke-width']">
      <line :x1="svgStyle.bx" :y1="svgStyle.by" :x2="svgStyle.ex" :y2="svgStyle.ey"></line>
    </svg>
  </div>
</template>

<script>
  /*
                                                                                                                                                                                矩形
                                                                                                                                                                                */

  import { mapGetters, mapState } from 'vuex';
  import interact from 'interactjs';
  import SCENE from '../../../../../../../model/ui-scene.js';

  import operateHandlerTwoDim from '../operate-handler-two-dim/operate-handler-two-dim';

  const layoutUtil = {};

  export default {
    name: 'ud-line',
    data() {
      return {
        offset: {
          x: 0,
          y: 0
        },
        resize: {
          w: 0,
          h: 0
        }
      };
    },
    props: {
      udObject: {
        type: Object,
        default: {}
      }
    },
    components: {
      operateHandlerTwoDim
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
      lineDirection() {
        let direction = '';
        let dx = this.udObject.ex().value - this.udObject.bx().value;
        let dy = this.udObject.ey().value - this.udObject.by().value;

        if (dx >= 0 && dy >= 0) {
          direction = 'right-bottom';
        }
        if (dx >= 0 && dy <= 0) {
          direction = 'right-top';
        }
        if (dx <= 0 && dy <= 0) {
          direction = 'left-top';
        }
        if (dx <= 0 && dy >= 0) {
          direction = 'left-bottom';
        }

        return direction;
      },
      wrapperStyle() {
        return {
          top: 0 + 'px',
          left: 0 + 'px',
          position: 'absolute',

          width:
            Math.floor(Math.abs(this.udObject.ex().value - this.udObject.bx().value) + this.udObject.strokeWidth().value) + 'px',
          height:
            Math.floor(Math.abs(this.udObject.ey().value - this.udObject.by().value) + this.udObject.strokeWidth().value) + 'px',

          'z-index': this.udObject.z().value,
          opacity: this.udObject.alpha().value / 100,
          transform: `translate(${Math.min(this.udObject.bx().value, this.udObject.ex().value) + this.offset.x}px,${Math.min(
            this.udObject.by().value,
            this.udObject.ey().value
          ) + this.offset.y}px) rotateX(${this.udObject.rotateX().value}deg) rotateY(${this.udObject.rotateY().value}deg) rotateZ(${
            this.udObject.rotateZ().value
          }deg)`,
          visibility: this.udObject.editorHide ? 'hidden' : 'visible'
        };
      },
      // 动态根据配置的数据对象，计算出元素的可视化样式
      svgStyle() {
        let s = {
          bx: 0,
          by: 0,
          ex: 0,
          ey: 0,

          color: this.udObject.bgColor().value,

          'stroke-width': this.udObject.strokeWidth().value
        };
        switch (this.lineDirection) {
          case 'right-bottom':
            s.ex = this.udObject.ex().value - this.udObject.bx().value;
            s.ey = this.udObject.ey().value - this.udObject.by().value;
            break;

          case 'right-top':
            s.by = this.udObject.by().value - this.udObject.ey().value;
            s.ex = this.udObject.ex().value - this.udObject.bx().value;
            break;

          case 'left-top':
            s.bx = this.udObject.bx().value - this.udObject.ex().value;
            s.by = this.udObject.by().value - this.udObject.ey().value;
            break;

          case 'left-bottom':
            s.bx = this.udObject.bx().value - this.udObject.ex().value;
            s.ey = this.udObject.ey().value - this.udObject.by().value;
            break;
          default:
            break;
        }
        return s;
      }
    },
    methods: {
      selectMe() {
        this.$store.commit('selectItem', {
          item: this.udObject,
          scene: SCENE.OBJECT_TREE
        });
      },
      initDrag() {
        let self = this;
      }
    },
    created() {},

    beforeDestroy() {
      interact('#' + 'agent-' + this.udObject._id().value).unset();
    },
    mounted() {
      this.initDrag();
    }
  };
</script>

<style lang="scss" scoped>
  .ud-line {
  }
</style>