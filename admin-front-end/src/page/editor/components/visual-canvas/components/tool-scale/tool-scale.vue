<template>
        <!-- 缩放调节区域。使用的背景图是黑色的，所以靠另外一个class来用css滤镜做反色 -->
        <div id="tool-scale" class="ud-h-middle bg-inverted not-drag" title="缩放编辑区">
            <div class="input-wrapper ud-h-middle">
                <el-input-number v-model="val" @change="handleChange" :precision="0" :step="step" :max="max" :min="min" size="mini"></el-input-number>
            </div>
            
        </div>
</template>

<script>

import { mapGetters,mapState } from 'vuex'

export default {
  name: 'tool-scale',
  data(){
      return {
         val:100
      }
  },
    props: {
        init:{
            type: Number,
            default: 100
        },
        step:{
            type: Number,
            default: 10
        },
        max:{
            type: Number,
            default: 300
        },
        min:{
            type: Number,
            default: 20
        }
    },
  methods:{
      handleChange(){
          this.$emit('change',this.val)
      }
  },
  created() {
      this.val = this.init;
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

            .input-wrapper {
                position: absolute;
                opacity: 0;
                // width: 100px;
                transition: opacity 1s;
                top:30px;
            }
        }
    }
    // 缩放调节器只有光标在编辑区域内才显示，也起到提示用户的作用
    #visual-canvas:hover #tool-scale{
        opacity: 1;
    }
    //光标移入放大镜才显示输入框
    #visual-canvas #tool-scale:hover .input-wrapper {
        opacity: 1;
    }

</style>