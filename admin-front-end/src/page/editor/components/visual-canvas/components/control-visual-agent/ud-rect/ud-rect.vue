<template>
  <div :id="'agent-'+udObject._id().value" class="ud-rect" :style="styleObject"></div>
</template>

<script>
  /*
                      矩形
                      */

  import { mapGetters, mapState } from 'vuex';
  export default {
    name: 'ud-rect',
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
          transform: `translate(${this.udObject.x().value}px,${this.udObject.y().value}px) rotateX(${
            this.udObject.rotateX().value
          }deg) rotateY(${this.udObject.rotateY().value}deg) rotateZ(${this.udObject.rotateZ().value}deg)`,
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
    mounted() {}
  };
</script>

<style lang="scss" scoped>
  .ud-rect {
  }
</style>