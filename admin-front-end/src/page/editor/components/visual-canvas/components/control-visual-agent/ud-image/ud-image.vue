<template>
  <udUITwoDimBase :ud-object="udObject" ref="baseComponent" @resize-width-change="widthChange" @resize-height-change="heightChange">
    <img :src="udObject.url().value" :style="imageStyle" alt="点击上传图片" @dblclick.stop="changeImgSrc">
  </udUITwoDimBase>
  <!-- <div :id="'agent-'+udObject._id().value" class="ud-image" :style="wrapperStyle" @click.stop="selectMe" @dblclick.stop="changeImgSrc">
    <operate-handler-two-dim v-if="udObject === currentSelection"></operate-handler-two-dim>
    <img :src="udObject.url().value" :style="imageStyle" alt="点击上传图片">
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
    name: 'ud-image',
    data() {
      return {
        width: 0,
        height: 0
      };
    },
    props: {
      ...udUITwoDimBase.props
      // udObject: {
      //   type: Object,
      //   default: {}
      // }
    },
    components: {
      udUITwoDimBase
    },

    computed: {
      ...mapState({
        currentSelection(state) {
          return state.selection.currentSelect;
        },
        currentScene(state) {
          return state.selection.scene;
        }
      }),

      imageStyle() {
        return {
          display: 'inline-block',
          width: this.width + 'px',
          height: this.height + 'px',
          'margin-top': this.udObject.marginTop().value + 'px',
          'margin-right': this.udObject.marginRight().value + 'px',
          'margin-left': this.udObject.marginLeft().value + 'px',
          'margin-bottom': this.udObject.marginBottom().value + 'px',
          'padding-top': this.udObject.paddingTop().value + 'px',
          'padding-right': this.udObject.paddingRight().value + 'px',
          'padding-left': this.udObject.paddingLeft().value + 'px',
          'padding-bottom': this.udObject.paddingBottom().value + 'px',
          'border-radius': this.udObject.borderRadius().value + 'px',
          'border-width': this.udObject.borderWidth().value + 'px',
          'border-color': this.udObject.borderColor().value,
          'border-style': 'solid'
        };
      }
    },
    methods: {
      widthChange(newVal, oldVal) {
        this.width = newVal;
      },
      heightChange(newVal, oldVal) {
        this.height = newVal;
      },
      changeImgSrc() {
        this.globalBus.$emit('change-image-src');
      }
    },
    created() {
      this.width = this.udObject.w().value;
      this.height = this.udObject.h().value;
    },

    beforeDestroy() {},
    watch: {
      'udObject.__ud_attribute_url__.value': function(newVal, oldVal) {
        function getUrlMeta(url, cb) {
          var img = new Image();
          img.addEventListener('load', function() {
            cb && cb(this.naturalWidth, this.naturalHeight);
          });
          img.src = url;
        }
        //根据最新的url,获取图片大小，重新修改图片高宽
        getUrlMeta(newVal, (w, h) => {
          this.$store.commit('updateObjectUDProperty', {
            id: this.udObject._id().value,
            propName: 'w',
            propValue: w
          });
          this.$store.commit('updateObjectUDProperty', {
            id: this.udObject._id().value,
            propName: 'h',
            propValue: h
          });
        });
      }
    },
    mounted() {}
  };
</script>

<style lang="scss" scoped>
  .ud-image {
  }
</style>