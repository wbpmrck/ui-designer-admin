<template>
        <!-- 缩放调节区域。使用的背景图是黑色的，所以靠另外一个class来用css滤镜做反色 -->
        <div id="tool-scale" class="ud-h-middle bg-inverted not-drag" title="缩放编辑区"></div>
</template>

<script>

import { mapGetters,mapState } from 'vuex'

export default {
  name: 'tool-scale',
  data(){
      return {
         
      }
  },
    props: {
        targetWidth:{
            type: Number,
            default: 720
        }
    },
  methods:{
  },
  created() {

  },
  mounted(){
  },
    computed: {
    },
 
}
</script>

<style lang="scss" scoped>
    #visual-canvas {
        // 画布的缩放调节器。
        #tool-scale {
            position: absolute;
            top:10px;
            z-index: 2;
            opacity: 0;
            width:28px;
            height:28px;
            // background-color: #efefef;
            background: url(./assets/img/glass.png);
            background-size: contain;
            transition: opacity 1s;

        }
    }
    // 缩放调节器只有光标在编辑区域内才显示，也起到提示用户的作用
    #visual-canvas:hover #tool-scale{
        opacity: 1;
    }

</style>