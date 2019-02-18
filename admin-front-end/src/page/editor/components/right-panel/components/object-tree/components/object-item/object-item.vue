<template>
    <div class="object-item">
      <div class="item-wrapper">
        <div class="item-title active">

          <div class="editor-visible" :class="{'editor-hide':itemData.editorHide}" @click="toggleHide">
            <span class="icon"></span>
          </div>

          <div class="child-ctl" :class="{open:itemData.hasOwnProperty('__ud_attribute_children__') && itemData.fold,close:itemData.hasOwnProperty('__ud_attribute_children__') && !itemData.fold}" @click="toggleFold">
            <span class="icon" v-if="itemData.hasOwnProperty('__ud_attribute_children__')"></span>
          </div>

          <div class="icon-stage">
            <span class="icon"></span>
          </div>

          <div class="itemData-name" :title="itemData.name().value">{{itemData.name().value}}</div>

          <div class="has-event">
            <span class="icon" v-if="true"></span>
            <!-- <span class="icon" v-if="itemData.eventHandlers().value.length>0"></span> -->
          </div>

        </div>


        <template v-if="!itemData.fold &&  itemData.children && itemData.children().value && itemData.children().value.length>0">
          <object-item  v-for="item in itemData.children().value" :key="item._id().value" :item-data="item"  :item-id="item._id().value"></object-item>
        </template>
        
        

      </div>
        
    </div>
</template>

<script>


import { mapGetters } from 'vuex'
export default {
  name: 'object-item',
  props: ['itemId'],
  // props: ['itemData'],
  // data(){
  //   return {
  //       itemData:undefined
  //   }
  // },
   computed: {
  itemData () {
    return this.$store.getters.item(this.itemId)
  }
  },
  methods:{
    toggleHide(){
      console.log('toggleHide')
      // this.$set(this.itemData,'editorHide',!this.itemData.editorHide)
      this.$store.commit('updateObject',{
        id:this.itemData._id().value,
        propName:'editorHide',
        propValue:!this.itemData.editorHide
      });
    },
    toggleFold(){
      console.log('toggleFold')
      // this.$set(this.itemData,'fold',!this.itemData.fold)
      this.$store.commit('updateObject',{
        id:this.itemData._id().value,
        propName:'fold',
        propValue:!this.itemData.fold
      });
    }
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>

.object-item {
    position: absolute;
    top: 30px;
    left: 0;
    right: 35px;
    min-width: 245px;
    bottom: 30px;
    background: #232323;
    // border-right: 1px solid #151515;
    border-right: 1px solid #faba32;
    // border:solid 2px red;
}

.item-wrapper {
  position: relative;
  width:100%;

}

// 舞台标题
.item-title {
  position: relative;
  height: 26px;
  width:100%;
  display: flex;
  align-items: center;

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
    padding-left: 18px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: inline-block;
    max-width:150px;
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
  }
}
// 当舞台是选择状态时
.item-title.active {
  background: #39311f;
}

</style>
