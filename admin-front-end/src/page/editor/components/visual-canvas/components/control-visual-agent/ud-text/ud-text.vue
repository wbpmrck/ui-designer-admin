<template>
  <udUITwoDimBase :ud-object="udObject">
    <div class="ud-text scrollable-1" :style="styleObject">{{udObject.txt().value}}</div>
  </udUITwoDimBase>

  <!-- <div :id="'agent-'+udObject._id().value" class="ud-text" :style="styleObject" @click.stop="selectMe">
    {{udObject.txt().value}}
    <operate-handler-two-dim v-if="udObject === currentSelection"></operate-handler-two-dim>
  </div>-->
</template>

<script>
  // 文本框
  import { mapGetters, mapState } from 'vuex';
  import { UDClipMode, UDTextAlignH, UDTextAlignV } from '../../../../../../../lib/ui-designer/index.js';
  import interact from 'interactjs';
  import SCENE from '../../../../../../../model/ui-scene.js';
  import udUITwoDimBase from '../components/ud-ui-two-dim/ud-ui-two-dim.vue';
  import { translateAlignH, translateAlignV } from '../../../../../../../model/style-transform.js';
  export default {
    name: 'ud-text',
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
      styleObject() {
        return {
          ...udUITwoDimBase.methods.contentBoxStyle(this),
          display: 'flex',
          // 'overflow-x': this.udObject.clipX().value === UDClipMode.CLIP ? 'hidden' : 'scroll',
          // 'overflow-y': this.udObject.clipY().value === UDClipMode.CLIP ? 'hidden' : 'scroll',
          // 'background-color': this.udObject.bgColor().value,
          // 'border-radius': this.udObject.borderRadius().value + 'px',
          // 'border-width': this.udObject.borderWidth().value + 'px',
          // 'border-color': this.udObject.borderColor().value,
          // 'border-style': 'solid',
          'font-family': this.udObject.font().value,
          'font-size': this.udObject.fs().value + 'px',
          color: this.udObject.fontColor().value,
          'font-weight': this.udObject.bold().value ? 'bold' : 'normal',
          'font-style': this.udObject.italic().value ? 'italic' : 'normal',
          'text-decoration': this.udObject.underline().value ? 'underline' : 'none',
          'justify-content': translateAlignH(this.udObject.alignH().value, 'flex'),
          'align-items': translateAlignV(this.udObject.alignV().value),
          'word-break': 'break-all',
          'white-space': 'pre-wrap',
          'line-height': this.udObject.fs().value + this.udObject.ls().value + 'px'
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
  .ud-text {
  }
</style>