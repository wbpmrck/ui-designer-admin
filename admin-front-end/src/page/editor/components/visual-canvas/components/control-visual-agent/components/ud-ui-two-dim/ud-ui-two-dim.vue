<template>
  <div :id="'agent-'+udObject._id().value" class="ud-ui-two-dim" :style="wrapperStyle" @click.stop="selectMe">
    <operate-handler-two-dim v-if="udObject === currentSelection"></operate-handler-two-dim>
    <!-- <div class="content-box" :style="contentBoxStyle"> -->
    <!-- 允许子组件插入自己要展示的内容 -->
    <slot></slot>
    <!-- </div> -->
  </div>
</template>

<script>
  /*
                                                                                                                                                                                                                                                                                                    矩形
                                                                                                                                                                                                                                                                                                    */

  import { UDPage, UDUIContainerAbsolute, UDUIContainerRow, UDClipMode } from '../../../../../../../../lib/ui-designer/index.js';
  import { mapGetters, mapState } from 'vuex';
  import interact from 'interactjs';
  import SCENE from '../../../../../../../../model/ui-scene.js';
  import { isInstanceOf } from '../../../../../../../../lib/utils/oop.js';

  import operateHandlerTwoDim from '../../operate-handler-two-dim/operate-handler-two-dim';

  export default {
    name: 'ud-ui-two-dim',
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
      /**
       * 组件所处的布局上下文环境，决定了组件的可视化代理如何在页面中呈现
       */
      layoutEnv() {
        if (isInstanceOf(this.udObject.parent, UDPage) || isInstanceOf(this.udObject.parent, UDUIContainerAbsolute)) {
          return 'absolute';
        } else if (isInstanceOf(this.udObject.parent, UDUIContainerRow)) {
          return 'relative';
        }
        return 'unknow';
      },

      wrapperStyle() {
        let base = {
          // 外边距要加在wrapper对象上而不是content.因为在容器中参与布局的时候，只有父亲元素会参与flex布局
          'margin-top': this.udObject.marginTop().value + 'px',
          'margin-right': this.udObject.marginRight().value + 'px',
          'margin-left': this.udObject.marginLeft().value + 'px',
          'margin-bottom': this.udObject.marginBottom().value + 'px',
          width: this.resize.w + 'px',
          height: this.resize.h + 'px',
          // 'z-index': this.udObject.z().value,
          // opacity: this.udObject.alpha().value / 100,
          transform: `translate(${this.udObject.x().value + this.offset.x}px,${this.udObject.y().value +
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
            // position: 'relative',
            // display: 'inline-block',
            ...base
          };
        } else {
          ret = {
            position: 'relative',
            ...base
          };
        }
        return ret;
      }
    },
    methods: {
      //帮助子类自动渲染属性
      contentBoxStyle(that) {
        let base = {
          // display: 'inline-block', // 默认是inline-block,子类可以覆盖
          'z-index': that.udObject.z().value,
          width: that.udObject.resizeW + 'px',
          height: that.udObject.resizeH + 'px',
          opacity: that.udObject.alpha().value / 100,
          'background-color': that.udObject.bgColor().value,
          'border-width': that.udObject.borderWidth().value + 'px',
          'border-color': that.udObject.borderColor().value,
          'border-style': 'solid'
        };
        if (that.udObject.paddingTop) {
          base = {
            ...base,
            'padding-top': that.udObject.paddingTop().value + 'px',
            'padding-right': that.udObject.paddingRight().value + 'px',
            'padding-left': that.udObject.paddingLeft().value + 'px',
            'padding-bottom': that.udObject.paddingBottom().value + 'px'
          };
        }

        if (that.udObject.clipX) {
          base = {
            ...base,

            'overflow-x': that.udObject.clipX().value === UDClipMode.CLIP ? 'hidden' : 'scroll',
            'overflow-y': that.udObject.clipY().value === UDClipMode.CLIP ? 'hidden' : 'scroll'
          };
        }

        if (that.udObject.borderRadius) {
          base = {
            ...base,
            'border-radius': that.udObject.borderRadius().value + 'px'
          };
        }

        return base;
      },
      selectMe() {
        console.log('base select');
        this.$store.commit('selectItem', {
          item: this.udObject,
          scene: SCENE.OBJECT_TREE
        });
      },
      initDrag() {
        let self = this;
        console.log(`init drag:${'#' + 'agent-' + self.udObject._id().value}`);

        // target elements with the "draggable" class
        // interact('#canvas-wrapper')
        interact('#' + 'agent-' + self.udObject._id().value)
          .draggable({
            // enable inertial throwing
            inertia: false,
            // enabled: false,

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

              console.log(`end drag,update :x=${self.offset.x},y=${self.offset.y}`);
              self.$store.commit('updateObjectUDProperty', {
                id: self.udObject._id().value,
                propName: 'x',
                propValue: self.udObject.x().value + self.offset.x
              });

              self.$store.commit('updateObjectUDProperty', {
                id: self.udObject._id().value,
                propName: 'y',
                propValue: self.udObject.y().value + self.offset.y
              });

              self.offset.x = 0;
              self.offset.y = 0;
            }
          })
          .resizable({
            // resize from all edges and corners
            edges: {
              left: '.op-left',
              right: '.op-right',
              bottom: '.op-bottom',
              top: '.op-top'
            },
            preserveAspectRatio: this.udObject.lockRatio().value,

            modifiers: [
              // minimum size NOTICE:注意，interact有坑，这个min必须大于0,否则resize事件拿不到正确的width,height
              interact.modifiers.restrictSize({
                min: { width: 1, height: 1 }
              })
            ]

            // inertia: true
          })
          .on('resizemove', event => {
            var target = event.target;
            // console.log(event.rect);
            // console.log(`resizemove,update :w=${event.rect.width},h=${event.rect.height}`);
            // console.log(`resizemove,deltaRect `);

            // console.log(event.deltaRect);
            // 记录当前变形之后的形状大小，vue自动绘制到DOM
            self.resize.w = event.rect.width;
            self.resize.h = event.rect.height;

            self.$store.commit('updateObject', {
              id: self.udObject._id().value,
              propName: 'resizeW',
              propValue: self.resize.w
            });

            self.$store.commit('updateObject', {
              id: self.udObject._id().value,
              propName: 'resizeH',
              propValue: self.resize.h
            });
            // 如果拖动了矩形的左边和上边，则记录到位移参数里
            self.offset.x += event.deltaRect.left;
            self.offset.y += event.deltaRect.top;
          })
          .on('resizeend', event => {
            console.log(`resizeend,update :x=${self.offset.x},y=${self.offset.y}`);
            self.$store.commit('updateObjectUDProperty', {
              id: self.udObject._id().value,
              propName: 'x',
              propValue: self.udObject.x().value + self.offset.x
            });

            self.$store.commit('updateObjectUDProperty', {
              id: self.udObject._id().value,
              propName: 'y',
              propValue: self.udObject.y().value + self.offset.y
            });

            self.$store.commit('updateObjectUDProperty', {
              id: self.udObject._id().value,
              propName: 'w',
              propValue: self.resize.w
            });

            self.$store.commit('updateObject', {
              id: self.udObject._id().value,
              propName: 'resizeW',
              propValue: self.resize.w
            });

            self.$store.commit('updateObjectUDProperty', {
              id: self.udObject._id().value,
              propName: 'h',
              propValue: self.resize.h
            });

            self.$store.commit('updateObject', {
              id: self.udObject._id().value,
              propName: 'resizeH',
              propValue: self.resize.h
            });
            // 将本次resize操作的结果重置，避免影响下一次操作
            self.offset.x = 0;
            self.offset.y = 0;
            // self.resize.w = 0;
            // self.resize.h = 0;
          });
      }
    },
    created() {
      this.resize.w = this.udObject.w().value;

      this.$store.commit('updateObject', {
        id: this.udObject._id().value,
        propName: 'resizeW',
        propValue: this.resize.w
      });

      // this.udObject.resizeW = this.udObject.w().value;
      this.resize.h = this.udObject.h().value;
      this.$store.commit('updateObject', {
        id: this.udObject._id().value,
        propName: 'resizeH',
        propValue: this.resize.h
      });

      // this.udObject.resizeH = this.udObject.h().value;
    },

    beforeDestroy() {
      interact('#' + 'agent-' + this.udObject._id().value).unset();
    },
    watch: {
      'resize.w': function(newVal, oldVal) {
        this.$emit('resize-width-change', newVal, oldVal);
      },
      'resize.h': function(newVal, oldVal) {
        this.$emit('resize-height-change', newVal, oldVal);
      },
      'udObject.__ud_attribute_lockRatio__.value': function(newVal, oldVal) {
        interact('#' + 'agent-' + this.udObject._id().value).unset();
        this.initDrag();
      },
      'udObject.__ud_attribute_w__.value': function(newVal, oldVal) {
        this.resize.w = newVal;

        this.$store.commit('updateObject', {
          id: this.udObject._id().value,
          propName: 'resizeW',
          propValue: this.resize.w
        });
      },
      'udObject.__ud_attribute_h__.value': function(newVal, oldVal) {
        this.resize.h = newVal;

        this.$store.commit('updateObject', {
          id: this.udObject._id().value,
          propName: 'resizeH',
          propValue: this.resize.h
        });
      }
    },
    mounted() {
      this.initDrag();
    }
  };
</script>

<style lang="scss" scoped>
  .ud-ui-two-dim {
    font-size: 0; //消除所有书写过程中的空白造成的容器像素偏差
  }
</style>