<template>
    <div class="effect-event-bar">
      <button title="事件" class="btn btn-clear event-btn icon-3" :disabled="!isCurrentSelectSupportEvents" @click="gotoEventPanel"></button>

    </div>
</template>

<script>

import { mapState } from 'vuex'
import SCENE from '../../../../../../model/ui-scene.js'

export default {
  name: 'effect-event-bar',
  data(){
    return {
        // stage:undefined
    }
  },
   computed: {

     ...mapState({
      isCurrentSelectSupportEvents (state) {
         let cur = state.selection.currentSelect;
         let scene = state.selection.scene;
         //如果不是选择对象树里的对象，则不可编辑事件
         if(scene !== SCENE.OBJECT_TREE){
           return false;
         }
        if(cur !== null && cur !== undefined){
          let events = cur.constructor.getSupportEvents?cur.constructor.getSupportEvents():[];
          
          console.log('support event:')
          console.log(events)

          return events.length>0
        }else{
          return false;
        }
      }
    }),
    // currentSelection () {
    //   return this.$store.currentSelect
    // },
    // isCurrentSelectSupportEvents () {
    //   let cur = this.$store.currentSelect;
    //   if(cur !== null && cur !== undefined){
    //     return cur.constructor.getSupportEvents && cur.constructor.getSupportEvents().length>0
    //   }else{
    //     return false;
    //   }
      
    // },
  },
  components: {
  },
  methods:{
    gotoEventPanel(){
      console.log('gotoEventPanel');
    }
  }
}
</script>

<style lang="scss" scoped>

// 效果和事件设置栏
.effect-event-bar {
  position: absolute;
  top: 30px;
  bottom: 30px;
  right: 0;
  width: 35px;
  background: #232323;
  border-left: solid 1px #000;
  z-index: 1;

  //所有按钮通用样式
  .btn {
    width: 30px;
    height: 30px;
    margin: 8px auto 0;
    display: inline-block;
    box-sizing: border-box;
  }

  :disabled {
    opacity: .3;
    cursor: not-allowed;
  }

  .event-btn {
      background-position: -1080px -0px
  }
  .event-btn:hover {
      background-position: -1080px -40px
  }
}

</style>
