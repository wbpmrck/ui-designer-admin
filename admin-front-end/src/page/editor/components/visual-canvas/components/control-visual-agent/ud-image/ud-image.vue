<template>
  <div :id="'agent-'+udObject._id().value" class="ud-image" :style="wrapperStyle" @click.stop="selectMe" @dblclick.stop="changeImgSrc">
    <operate-handler-two-dim v-if="udObject === currentSelection"></operate-handler-two-dim>
    <img :src="udObject.url().value" :style="imageStyle" alt="点击上传图片">
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
  export default {
    name: 'ud-image',
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
      // 动态根据配置的数据对象，计算出元素的可视化样式
      wrapperStyle() {
        return {
          top: 0 + 'px',
          left: 0 + 'px',
          position: 'absolute',
          
          width:this.resize.w + 'px',
          height: this.resize.h + 'px',
          'z-index': this.udObject.z().value,
          opacity: this.udObject.alpha().value / 100,
          'background-color': this.udObject.bgColor().value,
          transform: `translate(${this.udObject.x().value + this.offset.x}px,${this.udObject.y().value +
            this.offset.y}px) rotateX(${this.udObject.rotateX().value}deg) rotateY(${this.udObject.rotateY().value}deg) rotateZ(${
            this.udObject.rotateZ().value
          }deg)`,
          visibility: this.udObject.editorHide ? 'hidden' : 'visible'
        };
      },
      imageStyle() {
        return {
        
          width:this.resize.w + 'px',
          height: this.resize.h + 'px',
          'border-radius': this.udObject.borderRadius().value + 'px',
          'border-width': this.udObject.borderWidth().value + 'px',
          'border-color': this.udObject.borderColor().value,
          'border-style': 'solid'
        };
      }
    },
    methods: {
      changeImgSrc() {
        this.globalBus.$emit('change-image-src');
      },
      selectMe() {
        this.$store.commit('selectItem', {
          item: this.udObject,
          scene: SCENE.OBJECT_TREE
        });
      },
      initDrag() {
        let self = this;
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

              // console.log(`end drag,update :x=${self.offset.x},y=${self.offset.y}`);
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
            self.$store.commit('updateObjectUDProperty', {
              id: self.udObject._id().value,
              propName: 'h',
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
      this.resize.h = this.udObject.h().value;
    },

    beforeDestroy() {
      interact('#' + 'agent-' + this.udObject._id().value).unset();
    },
    watch: {
      'udObject.__ud_attribute_lockRatio__.value': function(newVal, oldVal) {
        interact('#' + 'agent-' + this.udObject._id().value).unset();
        this.initDrag();
      },
      'udObject.__ud_attribute_w__.value': function(newVal, oldVal) {
        this.resize.w = newVal;
      },
      'udObject.__ud_attribute_h__.value': function(newVal, oldVal) {
        this.resize.h = newVal;
      },

      'udObject.__ud_attribute_url__.value': function(newVal, oldVal) {
        function getUrlMeta(url, cb) {
          var img = new Image();
          img.addEventListener('load', function() {
            cb && cb(this.naturalWidth, this.naturalHeight);
          });
          img.src = url;
        }
        //根据最新的url,获取图片大小，重新修改图片高宽
        getUrlMeta(newVal, (w, h) => {
          this.$store.commit('updateObjectUDProperty', {
            id: this.udObject._id().value,
            propName: 'w',
            propValue: w
          });
          this.$store.commit('updateObjectUDProperty', {
            id: this.udObject._id().value,
            propName: 'h',
            propValue: h
          });
        });
      }
    },
    mounted() {
      this.initDrag();
    }
  };
</script>

<style lang="scss" scoped>
  .ud-image {
  }
</style>