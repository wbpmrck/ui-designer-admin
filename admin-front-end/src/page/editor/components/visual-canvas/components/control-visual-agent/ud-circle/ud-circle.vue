<template>
  <udUITwoDimBase :ud-object="udObject">
    <!-- <svg :style="{width:this.width+'px',height:this.height+'px'}" :stroke="svgStyle['border-color']" :stroke-width="svgStyle['border-width']"> -->
    <svg :style="svgStyle">
      <ellipse :fill="ellipseStyle['color']" :cx="ellipseStyle.cx" :cy="ellipseStyle.cy" :rx="ellipseStyle.rx" :ry="ellipseStyle.ry"></ellipse>
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
          ...udUITwoDimBase.methods.contentBoxStyle(this),
          stroke: this.udObject.borderColor().value,
          'stroke-width': this.udObject.borderWidth().value,
          border: 'none' //对于SVG元素来说，不需要边框。边框用于给内部的elipse
        };
      },
      ellipseStyle() {
        return {
          //对于椭圆来说，半径的长度要考虑减去边框线条的厚度
          rx: Math.floor(this.udObject.resizeW / 2 - this.udObject.borderWidth().value / 2),
          // rx: Math.floor((this.width === 0 ? this.udObject.w().value : this.width) / 2 - this.udObject.borderWidth().value),
          cx: Math.floor(this.udObject.resizeW / 2),
          ry: Math.floor(this.udObject.resizeH / 2 - this.udObject.borderWidth().value / 2),
          // ry: Math.floor((this.height === 0 ? this.udObject.h().value : this.height) / 2 - this.udObject.borderWidth().value),
          cy: Math.floor(this.udObject.resizeH / 2),
          color: this.udObject.color().value
        };
      }
    },
    methods: {},
    created() {},

    beforeDestroy() {},
    watch: {},
    mounted() {}
  };
</script>

<style lang="scss" scoped>
  .ud-circle {
  }
</style>