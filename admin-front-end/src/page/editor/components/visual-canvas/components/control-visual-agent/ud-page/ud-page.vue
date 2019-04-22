<template>
  <div class="ud-page" :style="styleObject"></div>
</template>

<script>
  /*
                                   这是一个用于在设计器中渲染Page的类:
                                   特性：
                                    1、Page的设计器代理不同于其他的UI元素，其并不支持拖动改变大小、位置。原因是：日常编辑和设计过程中，用户经常是在页面范围内部进行拖拽等操作，这样设计可以防止用户
                                    错误的操作导致Page的位置、大小发生改变
                                   */

  import { mapGetters, mapState } from 'vuex';
  import { UDClipMode } from '../../../../../../../lib/ui-designer/index.js';

  export default {
    name: 'ud-page',
    data() {
      return {};
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
          'overflow-x': this.udObject.clipX().value === UDClipMode.CLIP ? 'hidden' : 'scroll',
          'overflow-y': this.udObject.clipY().value === UDClipMode.CLIP ? 'hidden' : 'scroll',
          transform: `translate(${this.udObject.x().value}px,${this.udObject.y().value}px)`
        };
      }
    },
    methods: {},
    created() {},
    mounted() {}
  };
</script>

<style lang="scss" scoped>
  .ud-page {
  }
</style>