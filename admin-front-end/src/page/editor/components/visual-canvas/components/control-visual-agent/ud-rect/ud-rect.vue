<template>
  <div :id="'agent-'+udObject._id().value" class="ud-rect" :style="styleObject" @click.stop="selectMe"></div>
</template>

<script>
  /*
                                                                                                      矩形
                                                                                                      */

  import { mapGetters, mapState } from 'vuex';
  import interact from 'interactjs';
  import SCENE from '../../../../../../../model/ui-scene.js';
  export default {
    name: 'ud-rect',
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

    computed: {
      // 动态根据配置的数据对象，计算出元素的可视化样式
      styleObject() {
        return {
          top: 0 + 'px',
          left: 0 + 'px',
          position: 'absolute',
          // width: this.udObject.w().value + 'px',
          width: (this.resize.w === 0 ? this.udObject.w().value : this.resize.w) + 'px',
          // height: this.udObject.h().value + 'px',
          height: (this.resize.h === 0 ? this.udObject.h().value : this.resize.h) + 'px',
          'z-index': this.udObject.z().value,
          opacity: this.udObject.alpha().value / 100,
          'background-color': this.udObject.bgColor().value,
          transform: `translate(${this.udObject.x().value + this.offset.x}px,${this.udObject.y().value +
            this.offset.y}px) rotateX(${this.udObject.rotateX().value}deg) rotateY(${this.udObject.rotateY().value}deg) rotateZ(${
            this.udObject.rotateZ().value
          }deg)`,
          visibility: this.udObject.editorHide ? 'hidden' : 'visible',
          'border-radius': this.udObject.borderRadius().value + 'px',
          'border-width': this.udObject.borderWidth().value + 'px',
          'border-color': this.udObject.borderColor().value,
          'border-style': 'solid'
        };
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
              console.log(self.offset);
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
            edges: { left: true, right: true, bottom: true, top: true },

            modifiers: [
              // minimum size
              interact.modifiers.restrictSize({
                min: { width: 1, height: 1 }
              })
            ]

            // inertia: true
          })
          .on('resizemove', event => {
            // var target = event.target,
            //   x = parseFloat(target.getAttribute('data-x')) || 0,
            //   y = parseFloat(target.getAttribute('data-y')) || 0;

            // console.log(event.rect);
            // console.log(`resizemove,update :w=${event.rect.width},h=${event.rect.height}`);
            // // update the element's style
            // target.style.width = event.rect.width + 'px';
            // target.style.height = event.rect.height + 'px';

            // // // translate when resizing from top or left edges
            // // x += event.deltaRect.left;
            // // y += event.deltaRect.top;

            // // target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px,' + y + 'px)';

            // target.setAttribute('data-x', x);
            // target.setAttribute('data-y', y);

            var target = event.target;
            console.log(event.rect);
            console.log(`resizemove,update :w=${event.rect.width},h=${event.rect.height}`);
            console.log(`resizemove,deltaRect `);

            console.log(event.deltaRect);
            // update the element's style
            self.resize.w = event.rect.width;
            self.resize.h = event.rect.height;

            // translate when resizing from top or left edges
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

            self.offset.x = 0;
            self.offset.y = 0;
            self.resize.w = 0;
            self.resize.h = 0;
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
    mounted() {
      this.initDrag();
    }
  };
</script>

<style lang="scss" scoped>
  .ud-rect {
  }
</style>