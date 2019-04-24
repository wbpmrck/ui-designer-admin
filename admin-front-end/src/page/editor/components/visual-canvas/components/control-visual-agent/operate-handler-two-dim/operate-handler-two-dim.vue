<template>
  <div class="two-dim-operator" :style="{'border-width':strokeWidth+'px','border-color':strokeColor}">
    <div class="operate-handle-point top-left op-top op-left" :style="{width:endPointHandleSize+'px',height:endPointHandleSize+'px'}">
      <div
        class="icon"
        :style="{width:endPointDisplaySize+'px',height:endPointDisplaySize+'px','background-color':endPointColor,'border-width':strokeWidth+'px','border-color':strokeColor}"
      ></div>
    </div>

    <div class="operate-handle-point top op-top" :style="{width:endPointHandleSize+'px',height:endPointHandleSize+'px'}">
      <div
        class="icon"
        :style="{width:endPointDisplaySize+'px',height:endPointDisplaySize+'px','background-color':endPointColor,'border-width':strokeWidth+'px','border-color':strokeColor}"
      ></div>
    </div>

    <div class="operate-handle-point top-right op-top op-right" :style="{width:endPointHandleSize+'px',height:endPointHandleSize+'px'}">
      <div
        class="icon"
        :style="{width:endPointDisplaySize+'px',height:endPointDisplaySize+'px','background-color':endPointColor,'border-width':strokeWidth+'px','border-color':strokeColor}"
      ></div>
    </div>

    <div class="operate-handle-point right op-right" :style="{width:endPointHandleSize+'px',height:endPointHandleSize+'px'}">
      <div
        class="icon"
        :style="{width:endPointDisplaySize+'px',height:endPointDisplaySize+'px','background-color':endPointColor,'border-width':strokeWidth+'px','border-color':strokeColor}"
      ></div>
    </div>

    <div class="operate-handle-point bottom-right op-right op-bottom" :style="{width:endPointHandleSize+'px',height:endPointHandleSize+'px'}">
      <div
        class="icon"
        :style="{width:endPointDisplaySize+'px',height:endPointDisplaySize+'px','background-color':endPointColor,'border-width':strokeWidth+'px','border-color':strokeColor}"
      ></div>
    </div>

    <div class="operate-handle-point bottom op-bottom" :style="{width:endPointHandleSize+'px',height:endPointHandleSize+'px'}">
      <div
        class="icon"
        :style="{width:endPointDisplaySize+'px',height:endPointDisplaySize+'px','background-color':endPointColor,'border-width':strokeWidth+'px','border-color':strokeColor}"
      ></div>
    </div>

    <div class="operate-handle-point bottom-left op-bottom op-left" :style="{width:endPointHandleSize+'px',height:endPointHandleSize+'px'}">
      <div
        class="icon"
        :style="{width:endPointDisplaySize+'px',height:endPointDisplaySize+'px','background-color':endPointColor,'border-width':strokeWidth+'px','border-color':strokeColor}"
      ></div>
    </div>

    <div class="operate-handle-point left op-left" :style="{width:endPointHandleSize+'px',height:endPointHandleSize+'px'}">
      <div
        class="icon"
        :style="{width:endPointDisplaySize+'px',height:endPointDisplaySize+'px','background-color':endPointColor,'border-width':strokeWidth+'px','border-color':strokeColor}"
      ></div>
    </div>
  </div>
</template>

<script>
  // 用于在视觉上包裹选中的元素，表示其选中状态
  // 本组件适用于所有二维的图形，但是对于一维的比如：线条，则不适用
  import { mapGetters, mapState } from 'vuex';
  import interact from 'interactjs';
  import SCENE from '../../../../../../../model/ui-scene.js';
  export default {
    name: 'two-dim-operator',
    data() {
      return {};
    },
    props: {
      // 操控端点的实际操控区域
      endPointHandleSize: {
        type: Number,
        default: 16
      },
      // 操控端点的展示元素大小
      endPointDisplaySize: {
        type: Number,
        default: 6
      },
      strokeWidth: {
        type: Number,
        default: 1
      },
      strokeColor: {
        type: String,
        default: '#000'
      },
      endPointColor: {
        type: String,
        default: '#d3de1f'
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
          width: Math.floor(this.resize.w === 0 ? this.udObject.w().value : this.resize.w) + 'px',
          // height: this.udObject.h().value + 'px',
          height: Math.floor(this.resize.h === 0 ? this.udObject.h().value : this.resize.h) + 'px',
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
    methods: {},
    created() {},

    beforeDestroy() {},
    mounted() {}
  };
</script>

<style lang="scss" scoped>
  .two-dim-operator {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-style: solid;
    .operate-handle-point {
      display: inline-block;
      position: absolute;
      border-style: none;
    }
    .icon {
      display: inline-block;
      position: absolute;
      border-style: solid;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
    // 上端点
    .top {
      top: 0;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
    // 左上端点
    .top-left {
      top: 0;
      left: 0;
      transform: translateX(-50%) translateY(-50%);
    }
    // 右上端点
    .top-right {
      top: 0;
      right: 0;
      transform: translateX(50%) translateY(-50%);
    }
    // 右端点
    .right {
      top: 50%;
      right: 0;
      transform: translateX(50%) translateY(-50%);
    }
    // 下右端点
    .bottom-right {
      bottom: 0;
      right: 0;
      transform: translateX(50%) translateY(50%);
    }
    // 下端点
    .bottom {
      bottom: 0;
      left: 50%;
      transform: translateX(-50%) translateY(50%);
    }
    // 下左端点
    .bottom-left {
      bottom: 0;
      left: 0;
      transform: translateX(-50%) translateY(50%);
    }
    // 左端点
    .left {
      top: 50%;
      left: 0;
      transform: translateX(-50%) translateY(-50%);
    }
  }
</style>