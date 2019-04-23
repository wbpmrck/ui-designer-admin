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
          width: this.udObject.w().value + 'px',
          height: this.udObject.h().value + 'px',
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
        interact('#' + 'agent-' + self.udObject._id().value).draggable({
          // enable inertial throwing
          inertia: false,
          // keep the element within the area of it's parent
          // modifiers: [
          // interact.modifiers.restrict({
          //     restriction: "parent",
          //     endOnly: true,
          //     elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
          // }),
          // ],
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
            // var textEl = event.target.querySelector('p');
            // textEl && (textEl.textContent =
            //     'moved a distance of '
            //     + (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
            //                 Math.pow(event.pageY - event.y0, 2) | 0))
            //         .toFixed(2) + 'px');
          }
        });
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
  .ud-rect {
  }
</style>