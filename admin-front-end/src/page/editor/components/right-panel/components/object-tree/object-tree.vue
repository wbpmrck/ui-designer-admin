<template>
    <div class="object-tree scrollable-1">
      <div class="stage-wrapper">
        <div class="stage-title" :class="{active:currentSelection===stage}">

          <div class="editor-visible" :class="{'editor-hide':stage.editorHide}" @click="toggleHide" :title="stage.editorHide?'编辑器内隐藏':'编辑器内可见'">
            <span class="icon"></span>
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
    }
  },
  created() {
    //TODO:先创建一个空的舞台对象进去，做测试使用
    var rootStage = new UDStage();

    rootStage.eventHandlers({
      value:[
        "event1",
        "event2",
      ]
    })

    //一个容器
    let div1 = new UDUIContainer();
    div1.x({value:20});
    div1.y({value:30});
    div1.name({value:'区域1 区域1 区域1 区域1 区域1 区域1 区域1 区域1 区域1 区域1 '});

    // 一个矩形
    let rect1 = new UDRectangle();
    rect1.x({value:20});
    rect1.y({value:30});
    rect1.alpha({value:0.5});
    rect1.name({value:'rect11 rect11 rect11 rect11 rect11 rect11 rect11 rect11 rect11 rect11 rect11 '})

    // 2个矩形
    let rect2 = new UDRectangle();
    rect2.x({value:20});
    rect2.y({value:30});
    rect2.name({value:'rect22 rect22 rect22 rect22 rect22 rect22 rect22 rect22 rect22 rect22 rect22 rect22 '})

    // 矩形放在容器里
    div1.addChild(rect1);
    div1.addChild(rect2);


    //一个容器
    let div2 = new UDUIContainer();
    div2.x({value:20});
    div2.y({value:30});
    div2.name({value:'区域2 区域2 区域2 区域2 区域2 区域2 区域2 区域2 区域2 区域2 区域2 区域2 区域2 区域2 '});

    // 3个矩形
    let rect3 = new UDRectangle();
    rect3.x({value:20});
    rect3.y({value:30});
    rect3.name({value:'rect3 rect3 rect3 rect3 rect3 rect3 rect3 rect3 rect3 rect3 rect3'})
    rect3.eventHandlers({
      value:[
        "event31",
        "event32",
      ]
    })
    // 矩形放在容器里
    div2.addChild(rect3);

    rootStage.name({value:'舞台 这是一个非常自由的可以自定义的舞台'})
    // 容器放到舞台里
    rootStage.addChild(div1);
    rootStage.addChild(div2);
    // this.stage = rootStage;

    // this.$store.state.commit('updateObject',id,propName,propValue)
    // this.$store.commit('setStage',rootStage)
    


    console.log('tree commit')
    console.log(rootStage)
    this.$store.commit('setStage',rootStage)

    console.log(div1.constructor.name);
    console.log(rootStage.children() && rootStage.children().value && rootStage.children().value.length>0);
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
    background: #151515;
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
