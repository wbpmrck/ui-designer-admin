<template>
    <div class="object-tree scrollable-1">
      <div class="stage-wrapper">
        <div class="stage-title" :class="{active:currentSelection===stage}">

          <!-- <div class="editor-visible" :class="{'editor-hide':stage.editorHide}" @click="toggleHide" :title="stage.editorHide?'编辑器内隐藏':'编辑器内可见'"> -->
          <div class="editor-visible">
            <!-- <span class="icon"></span> -->
          </div>

          <div class="child-ctl" :class="{open:stage.hasOwnProperty('__ud_attribute_children__') && stage.fold,close:stage.hasOwnProperty('__ud_attribute_children__') && !stage.fold}" @click="toggleFold">
            <span class="icon" v-if="stage.hasOwnProperty('__ud_attribute_children__')"></span>
          </div>

          <div class="icon-stage" @click="selectStage">
            <span class="icon"></span>
          </div>

          <div class="stage-name" :title="stage.name().value"  @click="selectStage">{{stage.name().value}}</div>

          <div class="has-event">
            <!-- <span class="icon" v-if="true"></span> -->
            <span class="icon" @click="selectStageEvent" v-if="stage.eventHandlers().value.length>0" :class="{active:currentScene===SCENE.EVENT_PANEL && currentSelection===stage}"></span>
          </div>

        </div>

        <template v-if="!stage.fold && stage.children &&  stage.children().value && stage.children().value.length>0">
          <object-item  v-for="item in stage.children().value" :key="item._id().value" :item-data="item" :item-id="item._id().value" :item-level="1"></object-item>
        </template>
         
        

      </div>
        
    </div>
</template>

<script>

import { mapState } from 'vuex'
import SCENE  from '../../../../../../model/ui-scene.js'
import {UDStage,UDUIContainer,UDRectangle} from '../../../../../../lib/ui-designer/index.js'
import objectItem from './components/object-item/object-item'
import hotkeys from 'hotkeys-js';

export default {
  name: 'object-tree',
  data(){
    return {
        SCENE //必须放在data里，否则vue模板里没法直接使用SCENE进行比较
        // stage:undefined
    }
  },
  components: {
    objectItem,
  },
  computed: mapState({
    stage (state) {
      return state.stage.stage
    },
    currentSelection (state) {
      return state.selection.currentSelect
    },
    currentScene (state) {
      return state.selection.scene
    }
  }),
  methods:{
    deleteSelect(event, handler){
      // Prevent the default refresh event under WINDOWS system
      event.preventDefault();

      if(this.currentScene=== SCENE.OBJECT_TREE){
        //选择当前元素的下一个兄弟
        let nextSlibling = this.currentSelection.sibling(1);
        if(!nextSlibling){
          //如果没有兄弟，就选择父亲
          nextSlibling = this.currentSelection.parent;
        }
        //删除当前选择的对象
        this.$store.commit('deleteObject',{
          object:this.currentSelection,
          parent:this.currentSelection.parent,
        });

        //选择当前元素的下一个兄弟，或者是他父亲
        this.$store.commit('selectItem',{
          item:nextSlibling,
          scene:SCENE.OBJECT_TREE
        });
      }
    },
    selectStageEvent(){
      this.$store.commit('selectItem',{
        item:this.stage,
        scene:SCENE.EVENT_PANEL
      });
    },
    selectStage(){
      this.$store.commit('selectItem',{
        item:this.stage,
        scene:SCENE.OBJECT_TREE
      });
    },
    toggleHide(){
      // this.$set(this.stage,'editorHide',!this.stage.editorHide)
      this.$store.commit('updateObject',{
        id:this.stage._id().value,
        propName:'editorHide',
        propValue:!this.stage.editorHide
      });
    },
    toggleFold(){

      this.$store.commit('updateObject',{
        id:this.stage._id().value,
        propName:'fold',
        propValue:!this.stage.fold
      });
      // this.$set(this.stage,'fold',!this.stage.fold)
      // this.$store.commit('updateObject',this.stage._id().value,'fold',!this.stage.fold)
    },
    //模拟点击当前选择的项
    toggleFoldSelectItem(){
      this.$store.commit('updateObject',{
        id:this.currentSelection._id().value,
        propName:'fold',
        propValue:!this.currentSelection.fold
      });
    },
    //向上选择一个元素。注意这里是视觉上的向上选择。如果上一个元素被展开，则选择其最靠近自己的一个子元素
    selectUpItem(){

    },
    /**
     * 向下选择一个元素。注意这里是视觉上的向下选择。如果下一个元素被展开，则选择其最靠近自己的一个子元素
     */
    selectDownItem({from,searchChildren}={}){
      if(from===undefined){from = this.currentSelection} //默认搜索当前选择的
      if(searchChildren===undefined){searchChildren = true} //默认搜索孩子
      //先看自己有没有展开，并且有子元素
      if(!from.fold && from.children && from.children().value.length>0 && searchChildren){
        //展开了，且有子元素，则选择第一个
        this.$store.commit('selectItem',{
          item:from.children().value[0],
          scene:SCENE.OBJECT_TREE
        });
      }else if(from.parent){
        //自己没展开，或者没有子元素，那就选择下一个兄弟元素
        //如果自己是父亲的最后一个孩子，则后面没有兄弟
        if(from.parent.indexOfChild(from)===from.parent.children().value.length-1){
          //则把任务交给父亲，并且告诉父亲不要再搜索自己了
          this.selectDownItem({from:from.parent,searchChildren:false})
        }else{
          //还有下一个兄弟元素，则选择之
          let sibling = from.sibling(1);
          this.$store.commit('selectItem',{
            item:sibling,
            scene:SCENE.OBJECT_TREE
          });
        }
      }else{
        //如果没有父亲，则表示他是stage,则无需处理
      }
    },
  },
  created() {
    //注册键盘事件
    hotkeys('delete,backspace', this.deleteSelect);
    hotkeys('up', this.selectUpItem);
    hotkeys('down', this.selectDownItem);
    hotkeys('enter', this.toggleFoldSelectItem);
    //选择stage
    this.selectStage();
  },
  beforeDestroy(){
    //释放键盘事件注册
    hotkeys.unbind('delete,backspace');
  }
}
</script>

<style lang="scss" scoped>

.object-tree {
    position: absolute;
    top: 30px;
    left: 0;
    right: 35px;
    min-width: 245px;
    bottom: 30px;
    background: #232323;

    overflow-y: scroll;
    overflow-x: hidden;

    // border-right: 1px solid #151515;
    // border-right: 1px solid #efefef;
    // border:solid 2px red;
}


.stage-wrapper {
  position: relative;
  width:100%;

}

// 舞台标题
.stage-title {
  position: relative;
  height: 26px;
  width:100%;
  display: flex;
  align-items: center;
  border-left: solid 1px #000;
  border-right: solid 1px #000;
  border-bottom: solid 1px #000;

  // 编辑器可见性编辑
  .editor-visible{
    display: inline-block;
    position: relative;
    margin-left: 2px;
    width: 20px;
    height: 20px;
    // 2019年04月16日 注释：舞台不需要隐藏
    // background: #151515;
    cursor: pointer;
    span {
      position:absolute;
      left:50%;
      top:50%;
      transform: translateX(-50%) translateY(-50%);
      width: 12px;
      height: 12px;
      background-position: -800px 0;
    }
  }
  // 编辑器隐藏
  .editor-hide span{
    background-position: -800px -40px;
  }

  // 控制编辑器折叠子元素
  .child-ctl {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    .icon {
      width: 10px;
      min-width: 10px;
      height: 6px;
      background-position:  -1280px 0;
      // margin-right: 4px;
      position: relative;
      cursor: pointer;
    }
  }
  .child-ctl.open {
      transform: rotate(-90deg);
  }

  //舞台图标
  .icon-stage{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    .icon {
      width: 18px;
      height: 14px;
      background-position:  -720px 0;
    }
  }

  // 舞台名称
  .stage-name {
    padding-left: 4px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: inline-block;
    max-width:150px;
    cursor: pointer;
  }

  // 舞台已有事件标识
  .has-event {
    position: absolute;
    z-index: 10;
    top:2px;
    right:2px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    .icon {
      width: 22px;
      height: 22px;
      background-position: -757px 2.5px;
      cursor: pointer;
    }
    .icon.active{
      background-position:-757px -77.5px
    }
  }
}
// 当舞台是选择状态时
.stage-title.active {
  background: #39311f;
}

</style>
