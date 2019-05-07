<template>
  <div :id="'agent-'+udObject._id().value" class="ud-line" :style="wrapperStyle" @click.stop="selectMe">
    <!-- <svg style="width:100%;height:100%;position:absolute;left:0;top:0;right:0;bottom:0;" :stroke="svgStyle['color']" :stroke-width="svgStyle['stroke-width']"> -->
    <svg
      :style="{width:svgStyle.width,height:svgStyle.height}"
      style="position:absolute;left:0;top:0;"
      :stroke="svgStyle['color']"
      :stroke-width="svgStyle['stroke-width']"
    >
      <line class="svg-line" :x1="svgStyle.bx" :y1="svgStyle.by" :x2="svgStyle.ex" :y2="svgStyle.ey"></line>
    </svg>
    <div v-if="udObject === currentSelection" class="start-point operate-handle-point" :style="{left:svgStyle.bx+'px',top:svgStyle.by+'px'}">
      <div class="icon"></div>
    </div>
    <div v-if="udObject === currentSelection" class="end-point operate-handle-point" :style="{left:svgStyle.ex+'px',top:svgStyle.ey+'px'}">
      <div class="icon"></div>
    </div>
  </div>
</template>

<script>
  /*
                                                                                                                                                                                                                                                                          矩形
                                                                                                                                                                                                                                                                          */

  import { mapGetters, mapState } from 'vuex';
  import interact from 'interactjs';
  import { isInstanceOf } from '../../../../../../../lib/utils/oop.js';
  import { UDPage, UDUIContainerAbsolute, UDUIContainerRow, UDClipMode } from '../../../../../../../lib/ui-designer/index.js';
  import SCENE from '../../../../../../../model/ui-scene.js';

  const layoutUtil = {};

  export default {
    name: 'ud-line',
    data() {
      return {
        offset: {
          x: 0,
          y: 0,

          bx: 0,
          by: 0,

          ex: 0,
          ey: 0
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
    components: {},

    computed: {
      ...mapState({
        currentSelection(state) {
          return state.selection.currentSelect;
        },
        currentScene(state) {
          return state.selection.scene;
        }
      }),
      layoutEnv() {
        if (isInstanceOf(this.udObject.parent, UDPage) || isInstanceOf(this.udObject.parent, UDUIContainerAbsolute)) {
          return 'absolute';
        } else if (isInstanceOf(this.udObject.parent, UDUIContainerRow)) {
          return 'relative';
        }
        return 'unknow';
      },

      lineDirection() {
        let direction = '';
        let dx = this.udObject.ex().value + this.offset.ex - (this.udObject.bx().value + this.offset.bx);
        let dy = this.udObject.ey().value + this.offset.ey - (this.udObject.by().value + this.offset.by);

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
        let base = {
          //注意：这里+15只是为了拖动的时候多一些可操作区域，无其他用途。(2019年05月07日 因为在相对定位容器中是按照wrapper排列的，修改为0减少排列时的视差)
          width:
            Math.floor(
              Math.max(
                Math.abs(this.udObject.ex().value + this.offset.ex - (this.udObject.bx().value + this.offset.bx)),
                this.udObject.lineLen().value
              ) +
                this.udObject.strokeWidth().value +
                0
            ) + 'px',
          height:
            Math.floor(
              Math.max(
                Math.abs(this.udObject.ey().value + this.offset.ey - (this.udObject.by().value + this.offset.by)),
                this.udObject.lineLen().value
              ) +
                this.udObject.strokeWidth().value +
                0
            ) + 'px',

          'z-index': this.udObject.z().value,
          opacity: this.udObject.alpha().value / 100,
          transform: `translate(${Math.min(this.udObject.bx().value + this.offset.bx, this.udObject.ex().value + this.offset.ex) +
            this.offset.x}px,${Math.min(this.udObject.by().value + this.offset.by, this.udObject.ey().value + this.offset.ey) +
            this.offset.y}px) rotateX(${this.udObject.rotateX().value}deg) rotateY(${this.udObject.rotateY().value}deg) rotateZ(${
            this.udObject.rotateZ().value
          }deg)`,
          visibility: this.udObject.editorHide ? 'hidden' : 'visible'
        };

        let ret = base;

        if (this.layoutEnv === 'absolute') {
          ret = {
            top: 0 + 'px',
            left: 0 + 'px',
            position: 'absolute',
            ...base
          };
        } else {
          ret = {
            position: 'relative',
            ...base
          };
        }

        return ret;
      },

      // 动态根据配置的数据对象，计算出元素的可视化样式
      svgStyle() {
        let s = {
          width:
            Math.floor(
              Math.max(
                Math.abs(this.udObject.ex().value + this.offset.ex - (this.udObject.bx().value + this.offset.bx)),
                this.udObject.lineLen().value
              ) + this.udObject.strokeWidth().value
            ) + 'px',
          height:
            Math.floor(
              Math.max(
                Math.abs(this.udObject.ey().value + this.offset.ey - (this.udObject.by().value + this.offset.by)),
                this.udObject.lineLen().value
              ) + this.udObject.strokeWidth().value
            ) + 'px',
          bx: 0,
          by: 0,
          ex: 0,
          ey: 0,

          color: this.udObject.bgColor().value,

          'stroke-width': this.udObject.strokeWidth().value
        };
        //如果是绝对定位环境，则根据方向计算坐标
        if (this.layoutEnv === 'absolute') {
          switch (this.lineDirection) {
            case 'right-bottom':
              s.ex = this.udObject.ex().value + this.offset.ex - (this.udObject.bx().value + this.offset.bx);
              s.ey = this.udObject.ey().value + this.offset.ey - (this.udObject.by().value + this.offset.by);
              break;

            case 'right-top':
              s.by = this.udObject.by().value + this.offset.by - (this.udObject.ey().value + this.offset.ey);
              s.ex = this.udObject.ex().value + this.offset.ex - (this.udObject.bx().value + this.offset.bx);
              break;

            case 'left-top':
              s.bx = this.udObject.bx().value + this.offset.bx - (this.udObject.ex().value + this.offset.ex);
              s.by = this.udObject.by().value + this.offset.by - (this.udObject.ey().value + this.offset.ey);
              break;

            case 'left-bottom':
              s.bx = this.udObject.bx().value + this.offset.bx - (this.udObject.ex().value + this.offset.ex);
              s.ey = this.udObject.ey().value + this.offset.ey - (this.udObject.by().value + this.offset.by);
              break;
            default:
              break;
          }
        } else {
          s.by = Math.floor(parseInt(s.height) / 2);
          s.ey = Math.floor(parseInt(s.height) / 2);
          //如果是相对定位环境，则根据线条长度计算
          s.ex = this.udObject.lineLen().value;
        }
        return s;
      }
    },
    methods: {
      // 根据坐标信息计算线条长度
      calculateLen() {},
      // 根据线条长度计算终止坐标信息
      calculatePos() {},
      selectMe() {
        this.$store.commit('selectItem', {
          item: this.udObject,
          scene: SCENE.OBJECT_TREE
        });
      },
      initDrag() {
        let self = this;

        // 整条线的移动
        interact('#' + 'agent-' + self.udObject._id().value + ' .svg-line').draggable({
          // enable inertial throwing
          inertia: false,
          enabled: self.layoutEnv === 'absolute',

          // enable autoScroll
          autoScroll: true,
          ignoreFrom: '.not-drag',
          // call this function on every dragmove event
          onmove: ({ x0, y0, dx, dy }) => {
            self.offset.x += dx;
            self.offset.y += dy;
            // console.log(self.offset);
          },
          // call this function on every dragend event
          onend: function(event) {
            // 将移动改变的位移，提交到store,并清空自身的编辑位移量

            // console.log(`end drag,update :x=${self.offset.x},y=${self.offset.y}`);
            self.$store.commit('updateObjectUDProperty', {
              id: self.udObject._id().value,
              propName: 'bx',
              propValue: self.udObject.bx().value + self.offset.x
            });

            self.$store.commit('updateObjectUDProperty', {
              id: self.udObject._id().value,
              propName: 'ex',
              propValue: self.udObject.ex().value + self.offset.x
            });

            self.$store.commit('updateObjectUDProperty', {
              id: self.udObject._id().value,
              propName: 'by',
              propValue: self.udObject.by().value + self.offset.y
            });
            self.$store.commit('updateObjectUDProperty', {
              id: self.udObject._id().value,
              propName: 'ey',
              propValue: self.udObject.ey().value + self.offset.y
            });

            self.offset.x = 0;
            self.offset.y = 0;
          }
        });

        // 起点的移动
        interact('#' + 'agent-' + self.udObject._id().value + ' .start-point').draggable({
          // enable inertial throwing
          inertia: false,
          enable: self.layoutEnv === 'absolute',
          // enable autoScroll
          autoScroll: true,
          ignoreFrom: '.not-drag',
          // call this function on every dragmove event
          onmove: ({ x0, y0, dx, dy }) => {
            self.offset.bx += dx;
            self.offset.by += dy;
            // console.log(self.offset);
          },
          // call this function on every dragend event
          onend: function(event) {
            // 将移动改变的位移，提交到store,并清空自身的编辑位移量

            // console.log(`end drag,update :x=${self.offset.x},y=${self.offset.y}`);
            self.$store.commit('updateObjectUDProperty', {
              id: self.udObject._id().value,
              propName: 'bx',
              propValue: self.udObject.bx().value + self.offset.bx
            });
            self.$store.commit('updateObjectUDProperty', {
              id: self.udObject._id().value,
              propName: 'by',
              propValue: self.udObject.by().value + self.offset.by
            });

            self.offset.bx = 0;
            self.offset.by = 0;
          }
        });
        // 终点的移动
        interact('#' + 'agent-' + self.udObject._id().value + ' .end-point').draggable({
          // enable inertial throwing
          inertia: false,
          enable: self.layoutEnv === 'absolute',
          // enable autoScroll
          autoScroll: true,
          ignoreFrom: '.not-drag',
          // call this function on every dragmove event
          onmove: ({ x0, y0, dx, dy }) => {
            self.offset.ex += dx;
            self.offset.ey += dy;
            // console.log(self.offset);
          },
          // call this function on every dragend event
          onend: function(event) {
            // 将移动改变的位移，提交到store,并清空自身的编辑位移量
            self.$store.commit('updateObjectUDProperty', {
              id: self.udObject._id().value,
              propName: 'ex',
              propValue: self.udObject.ex().value + self.offset.ex
            });
            self.$store.commit('updateObjectUDProperty', {
              id: self.udObject._id().value,
              propName: 'ey',
              propValue: self.udObject.ey().value + self.offset.ey
            });

            self.offset.ex = 0;
            self.offset.ey = 0;
          }
        });
      }
    },
    created() {},

    beforeDestroy() {
      interact('#' + 'agent-' + this.udObject._id().value + ' .svg-line').unset();
      interact('#' + 'agent-' + this.udObject._id().value + ' .start-point').unset();
      interact('#' + 'agent-' + this.udObject._id().value + ' .end-point').unset();
    },
    mounted() {
      this.initDrag();
    },
    watch: {
      'udObject.__ud_attribute_bx__.value': function(newVal, oldVal) {
        this.calculateLen();
      },
      'udObject.__ud_attribute_by__.value': function(newVal, oldVal) {
        this.calculateLen();
      },
      'udObject.__ud_attribute_ex__.value': function(newVal, oldVal) {
        this.calculateLen();
      },
      'udObject.__ud_attribute_ey__.value': function(newVal, oldVal) {
        this.calculateLen();
      },
      'udObject.__ud_attribute_lineLen__.value': function(newVal, oldVal) {
        this.calculatePos();
      }
    }
  };
</script>

<style lang="scss" scoped>
  .ud-line {
    .start-point::after {
      content: 'S';
      font-size: 12px;
      color: #000;
      position: absolute;
      text-align: left;
      left: -5px;
      top: -5px;
    }
    .end-point::after {
      content: 'E';
      font-size: 12px;
      color: #000;
      position: absolute;
      text-align: left;
      bottom: -5px;
      right: -5px;
    }

    .operate-handle-point {
      display: inline-block;
      position: absolute;
      border-style: none;

      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      width: 16px;
      height: 16px;

      .icon {
        display: inline-block;
        position: absolute;
        border-style: solid;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        width: 6px;
        height: 6px;

        border: solid 1px #000;
        background-color: #d3de1f;
      }
    }
  }
</style>