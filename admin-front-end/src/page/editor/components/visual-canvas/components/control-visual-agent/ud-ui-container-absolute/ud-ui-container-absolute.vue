<template>
  <udUITwoDimBase :ud-object="udObject" ref="baseComponent" @resize-width-change="widthChange" @resize-height-change="heightChange">
    <div class="ud-ui-container-absolute scrollable-1" :style="styleObject">
      <component
        :is="visualAgents[child.constructor.getTypeName()]"
        :ud-object="child"
        v-for="child in udObject.__ud_attribute_children__.value"
        :key="child.__ud_attribute__id__.value"
      ></component>
    </div>
  </udUITwoDimBase>
  <!-- <div :id="'agent-'+udObject._id().value" class="ud-ui-container-absolute scrollable-1" :style="styleObject" @click.stop="selectMe">
    <operate-handler-two-dim v-if="udObject === currentSelection"></operate-handler-two-dim>
    <component
      :is="visualAgents[child.constructor.getTypeName()]"
      :ud-object="child"
      v-for="child in udObject.__ud_attribute_children__.value"
      :key="child.__ud_attribute__id__.value"
    ></component>
  </div>-->
</template>

<script>
  /*
                                                                                                                                                        矩形
                                                                                                                                                        */

  import { mapGetters, mapState } from 'vuex';
  import { UDClipMode } from '../../../../../../../lib/ui-designer/index.js';
  import interact from 'interactjs';
  import SCENE from '../../../../../../../model/ui-scene.js';
  import udUITwoDimBase from '../components/ud-ui-two-dim/ud-ui-two-dim.vue';
  import operateHandlerTwoDim from '../operate-handler-two-dim/operate-handler-two-dim';
  import UDInput from '../ud-input/ud-input.vue';
  import UDMultiInput from '../ud-multi-input/ud-multi-input.vue';
  import UDText from '../ud-text/ud-text.vue';
  import UDRectangle from '../ud-rect/ud-rect.vue';
  import UDCircle from '../ud-circle/ud-circle.vue';
  import UDLine from '../ud-line/ud-line.vue';
  import UDImage from '../ud-image/ud-image.vue';
  import UDUIContainerAbsolute from '../ud-ui-container-absolute/ud-ui-container-absolute.vue';
  import UDUIContainerRow from '../ud-ui-container-row/ud-ui-container-row.vue';
  export default {
    name: 'ud-ui-container-absolute',
    components: {
      UDMultiInput,
      UDInput,
      UDText,
      UDUIContainerRow,
      UDUIContainerAbsolute,
      UDImage,
      UDLine,
      UDRectangle,
      UDCircle,
      udUITwoDimBase,
      operateHandlerTwoDim
    },

    data() {
      return {
        visualAgents: {
          UDUIContainerRow,
          UDMultiInput,
          UDInput,
          UDText,
          UDUIContainerAbsolute,
          UDImage,
          UDLine,
          UDRectangle,
          UDCircle
        },

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
          position: 'absolute', // 容器设置绝对定位，主要是因为子元素是绝对定位，为了实现overflow特性，不得不而已
          width: this.width + 'px',
          height: this.height + 'px',
          'background-color': this.udObject.bgColor().value,
          'border-width': this.udObject.borderWidth().value + 'px',
          'border-color': this.udObject.borderColor().value,
          'border-style': 'solid',
          'overflow-x': this.udObject.clipX().value === UDClipMode.CLIP ? 'hidden' : 'scroll',
          'overflow-y': this.udObject.clipY().value === UDClipMode.CLIP ? 'hidden' : 'scroll',

          'margin-top': this.udObject.marginTop().value + 'px',
          'margin-right': this.udObject.marginRight().value + 'px',
          'margin-left': this.udObject.marginLeft().value + 'px',
          'margin-bottom': this.udObject.marginBottom().value + 'px'
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
      //       self.resize.w = event.rect.width;
      //       self.resize.h = event.rect.height;

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
      //         propValue: self.resize.w
      //       });
      //       self.$store.commit('updateObjectUDProperty', {
      //         id: self.udObject._id().value,
      //         propName: 'h',
      //         propValue: self.resize.h
      //       });

      //       // 将本次resize操作的结果重置，避免影响下一次操作
      //       self.offset.x = 0;
      //       self.offset.y = 0;
      //       // self.resize.w = 0;
      //       // self.resize.h = 0;
      //     });
      // }
    },
    created() {
      this.width = this.udObject.w().value;
      this.height = this.udObject.h().value;
      // this.resize.w = this.udObject.w().value;
      // this.resize.h = this.udObject.h().value;
    },

    beforeDestroy() {
      // interact('#' + 'agent-' + this.udObject._id().value).unset();
    },
    watch: {
      // 'udObject.__ud_attribute_lockRatio__.value': function(newVal, oldVal) {
      //   interact('#' + 'agent-' + this.udObject._id().value).unset();
      //   this.initDrag();
      // },
      // 'udObject.__ud_attribute_w__.value': function(newVal, oldVal) {
      //   this.resize.w = newVal;
      // },
      // 'udObject.__ud_attribute_h__.value': function(newVal, oldVal) {
      //   this.resize.h = newVal;
      // }
    },
    mounted() {
      // this.initDrag();
    }
  };
</script>

<style lang="scss" scoped>
  .ud-ui-container-absolute {
  }
</style>