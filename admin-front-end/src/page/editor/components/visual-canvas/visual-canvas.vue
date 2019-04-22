<template>
  <div id="visual-canvas" v-if="currentPage" class="scrollable-1">
    <!-- 缩放调节区域 -->
    <scaler @change="changeScale" :init="scale*100"></scaler>
    <!-- 主场景区域 -->
    <div id="canvas-wrapper" class="not-drag" :style="{ transform: 'scale('+scale+')  translate(' + offset.x + 'px, ' + offset.y + 'px)'}">
      <!-- 舞台 -->
      <div id="stage-root" class="scrollable-1" :style="{width:stage.sw().value+30+'px',height:stage.sh().value+30+'px'}">
        <!-- 尺子 FIXME:修改背景方式，让舞台包括ruler在内，让ruler刻度可以随着page滚动一起滚动-->
        <div
          class="bg-paper"
          :style="{width:Math.max(stage.sw().value,currentPage.w().value+currentPage.x().value)+'px',height:Math.max(stage.sh().value,currentPage.h().value+currentPage.y().value)+'px'}"
        ></div>
        <!-- <bg-ruler :target-width="stage.sw().value" :target-height="stage.sh().value"></bg-ruler> -->
        <bg-ruler
          :target-width="Math.max(stage.sw().value,currentPage.w().value+currentPage.x().value)"
          :target-height="Math.max(stage.sh().value,currentPage.h().value+currentPage.y().value)"
        ></bg-ruler>

        <div id="display-container">
          <UDPageAgent :ud-object="currentPage"></UDPageAgent>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import bgRuler from './components/bg-ruler/bg-ruler';
  import scaler from './components/tool-scale/tool-scale';
  import UDPageAgent from './components/control-visual-agent/ud-page/ud-page';

  import { mapGetters, mapState } from 'vuex';
  import { isInstanceOf } from '../../../../lib/utils/oop.js';
  import { UDPage } from '../../../../lib/ui-designer/index.js';
  import interact from 'interactjs';

  export default {
    name: 'visual-canvas',
    data() {
      return {
        scale: 1, //缩放倍率
        //舞台容器偏移
        offset: {
          x: 0,
          y: 120
        }
      };
    },
    methods: {
      changeScale(scale) {
        this.scale = scale / 100;
      },
      initDrag() {
        let self = this;
        // target elements with the "draggable" class
        // interact('#canvas-wrapper')
        interact('#visual-canvas').draggable({
          // enable inertial throwing
          inertia: true,
          // keep the element within the area of it's parent
          // modifiers: [
          // interact.modifiers.restrict({
          //     restriction: "parent",
          //     endOnly: true,
          //     elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
          // }),
          // ],
          // enable autoScroll
          autoScroll: true,
          ignoreFrom: '.not-drag',
          // call this function on every dragmove event
          onmove: ({ x0, y0, dx, dy }) => {
            self.offset.x += dx;
            self.offset.y += dy;
          },
          // call this function on every dragend event
          onend: function(event) {
            // var textEl = event.target.querySelector('p');
            // textEl && (textEl.textContent =
            //     'moved a distance of '
            //     + (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
            //                 Math.pow(event.pageY - event.y0, 2) | 0))
            //         .toFixed(2) + 'px');
          }
        });

        // function dragMoveListener (event) {
        //     let {x0, y0,dx,dy} = event;

        //     self.offset.x += dx;
        //     self.offset.y += dy;
        // }
      }
    },
    created() {
      //初始化舞台容器位置，使得用户容易看到

      //之前是使用修改绝对定位的方式，后来改为修改transform的方式提高拖动性能。
      // this.offset.x = Math.floor( (document.body.clientWidth-this.stage.sw().value)/2 );

      //注意因为画布父亲的text-align是center,所以默认画布就在中间,我们只需要把它向左偏移一半的位置
      this.offset.x = 0 - this.stage.sw().value / 2;
    },
    mounted() {
      this.initDrag();
    },
    computed: {
      ...mapState({
        stage(state) {
          return state.stage.stage;
        },
        currentSelection(state) {
          return state.selection.currentSelect;
        },
        currentSelectTool(state) {
          return state.selection.currentSelectTool;
        },
        isToolBoxExpand(state) {
          return state.editor.toolBox.isExpand;
        },
        currentScene(state) {
          return state.selection.scene;
        }
      }),
      currentPage() {
        let cp;
        if (this.currentSelection) {
          //看当前是否选择的是页面
          if (isInstanceOf(this.currentSelection, UDPage)) {
            cp = this.currentSelection;
          } else {
            //一直向上查找元素所在的页面
            let p = this.currentSelection.parent;
            while (p && !isInstanceOf(p, UDPage)) {
              p = p.parent;
            }
            cp = p;
          }
        } else {
          cp = undefined;
        }
        return cp;
      }
    },
    components: {
      bgRuler,
      scaler,
      UDPageAgent
    }
  };
</script>

<style lang="scss" scoped>
  #visual-canvas {
    position: fixed;
    top: 37px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    #canvas-wrapper {
      position: absolute;
      z-index: 1;
      display: inline-block;

      // 使用纯css3实现灰白格子效果(模拟类似透明图片的设计效果)
      #stage-root {
        position: absolute;
        left: 0px;
        top: 0px;
        right: 0px;
        bottom: 0px;
        overflow-y: scroll;
        overflow-x: scroll;

        .bg-paper {
          display: inline-block;
          position: relative;
          margin-left: 30px;
          margin-top: 30px;
          background-color: #fff;
          background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee),
            linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee);
          background-size: 16px 16px;
          background-position: 0 0, 8px 8px;
        }
        #display-container {
          display: inline-block;
          position: absolute;
          left: 30px;
          top: 30px;
        }
      }
    }
  }
</style>