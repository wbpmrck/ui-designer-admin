<template>
  <udUITwoDimBase :ud-object="udObject" ref="baseComponent" @resize-width-change="widthChange" @resize-height-change="heightChange">
    <svg :style="{width:this.width+'px',height:this.height+'px'}" :stroke="svgStyle['border-color']" :stroke-width="svgStyle['border-width']">
      <ellipse :fill="svgStyle['background-color']" :cx="svgStyle.cx" :cy="svgStyle.cy" :rx="svgStyle.rx" :ry="svgStyle.ry"></ellipse>
    </svg>
  </udUITwoDimBase>

  <!-- <div :id="'agent-'+udObject._id().value" class="ud-circle" :style="wrapperStyle" @click.stop="selectMe">
    <operate-handler-two-dim v-if="udObject === currentSelection"></operate-handler-two-dim>
    <svg
      style="width:100%;height:100%;position:absolute;left:0;top:0;right:0;bottom:0;"
      :stroke="svgStyle['border-color']"
      :stroke-width="svgStyle['border-width']"
    >
      <ellipse :fill="svgStyle['background-color']" :cx="svgStyle.cx" :cy="svgStyle.cy" :rx="svgStyle.rx" :ry="svgStyle.ry"></ellipse>
    </svg>
  </div>-->
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
    name: 'ud-circle',
    data() {
      return {
        width: 0,
        height: 0
      };
    },
    props: {
      ...udUITwoDimBase.props
    },
    components: {
      udUITwoDimBase
    },

    computed: {
      // 动态根据配置的数据对象，计算出元素的可视化样式
      svgStyle() {
        return {
          //对于椭圆来说，半径的长度要考虑减去边框线条的厚度
          rx: Math.floor(this.width / 2 - this.udObject.borderWidth().value / 2),
          // rx: Math.floor((this.width === 0 ? this.udObject.w().value : this.width) / 2 - this.udObject.borderWidth().value),
          cx: Math.floor(this.width / 2),
          ry: Math.floor(this.height / 2 - this.udObject.borderWidth().value / 2),
          // ry: Math.floor((this.height === 0 ? this.udObject.h().value : this.height) / 2 - this.udObject.borderWidth().value),
          cy: Math.floor(this.height / 2),

          'background-color': this.udObject.bgColor().value,

          'border-width': this.udObject.borderWidth().value,
          'border-color': this.udObject.borderColor().value
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
      // selectMe() {
      //   this.$store.commit('selectItem', {
      //     item: this.udObject,
      //     scene: SCENE.OBJECT_TREE
      //   });
      // },
      // initDrag() {
      //   let self = this;
      //   // target elements with the "draggable" class
      //   // interact('#canvas-wrapper')
      //   interact('#' + 'agent-' + self.udObject._id().value)
      //     .draggable({
      //       // enable inertial throwing
      //       inertia: false,
      //       // enabled: false,

      //       // enable autoScroll
      //       autoScroll: true,
      //       ignoreFrom: '.not-drag',
      //       // call this function on every dragmove event
      //       onmove: ({ x0, y0, dx, dy }) => {
      //         self.offset.x += dx;
      //         self.offset.y += dy;
      //         // console.log(self.offset);
      //       },
      //       // call this function on every dragend event
      //       onend: function(event) {
      //         // 将移动改变的位移，提交到store,并清空自身的编辑位移量

      //         // console.log(`end drag,update :x=${self.offset.x},y=${self.offset.y}`);
      //         self.$store.commit('updateObjectUDProperty', {
      //           id: self.udObject._id().value,
      //           propName: 'x',
      //           propValue: self.udObject.x().value + self.offset.x
      //         });

      //         self.$store.commit('updateObjectUDProperty', {
      //           id: self.udObject._id().value,
      //           propName: 'y',
      //           propValue: self.udObject.y().value + self.offset.y
      //         });

      //         self.offset.x = 0;
      //         self.offset.y = 0;
      //       }
      //     })
      //     .resizable({
      //       // resize from all edges and corners
      //       edges: {
      //         left: '.op-left',
      //         right: '.op-right',
      //         bottom: '.op-bottom',
      //         top: '.op-top'
      //       },
      //       preserveAspectRatio: this.udObject.lockRatio().value,

      //       modifiers: [
      //         // minimum size NOTICE:注意，interact有坑，这个min必须大于0,否则resize事件拿不到正确的width,height
      //         interact.modifiers.restrictSize({
      //           min: { width: 1, height: 1 }
      //         })
      //       ]

      //       // inertia: true
      //     })
      //     .on('resizemove', event => {
      //       var target = event.target;
      //       // console.log(event.rect);
      //       // console.log(`resizemove,update :w=${event.rect.width},h=${event.rect.height}`);
      //       // console.log(`resizemove,deltaRect `);

      //       // console.log(event.deltaRect);
      //       // 记录当前变形之后的形状大小，vue自动绘制到DOM
      //       self.width = event.rect.width;
      //       self.height = event.rect.height;

      //       // 如果拖动了矩形的左边和上边，则记录到位移参数里
      //       self.offset.x += event.deltaRect.left;
      //       self.offset.y += event.deltaRect.top;
      //     })
      //     .on('resizeend', event => {
      //       console.log(`resizeend,update :x=${self.offset.x},y=${self.offset.y}`);
      //       self.$store.commit('updateObjectUDProperty', {
      //         id: self.udObject._id().value,
      //         propName: 'x',
      //         propValue: self.udObject.x().value + self.offset.x
      //       });

      //       self.$store.commit('updateObjectUDProperty', {
      //         id: self.udObject._id().value,
      //         propName: 'y',
      //         propValue: self.udObject.y().value + self.offset.y
      //       });

      //       self.$store.commit('updateObjectUDProperty', {
      //         id: self.udObject._id().value,
      //         propName: 'w',
      //         propValue: self.width
      //       });
      //       self.$store.commit('updateObjectUDProperty', {
      //         id: self.udObject._id().value,
      //         propName: 'h',
      //         propValue: self.height
      //       });

      //       // 将本次resize操作的结果重置，避免影响下一次操作
      //       self.offset.x = 0;
      //       self.offset.y = 0;
      //       // self.width = 0;
      //       // self.height = 0;
      //     });
      // }
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
  .ud-circle {
  }
</style>