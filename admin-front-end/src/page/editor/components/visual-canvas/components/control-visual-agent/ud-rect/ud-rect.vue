<template>
  <udUITwoDimBase :ud-object="udObject">
    <div class="ud-rect" :style="styleObject"></div>
  </udUITwoDimBase>
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
    name: 'ud-rect',
    // extends: udUITwoDimBase,
    data() {
      return {};
    },
    props: {
      ...udUITwoDimBase.props
    },
    components: {
      udUITwoDimBase
    },

    computed: {
      // 动态根据配置的数据对象，计算出元素的可视化样式
      styleObject() {
        return {
          ...udUITwoDimBase.methods.contentBoxStyle(this),
          display: 'inline-block'
          // 'border-radius': this.udObject.borderRadius().value + 'px',
          // 'border-width': this.udObject.borderWidth().value + 'px',
          // 'border-color': this.udObject.borderColor().value,
          // 'border-style': 'solid'
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
  .ud-rect {
  }
</style>