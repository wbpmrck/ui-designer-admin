<template>
    <div class="object-item">
      <div class="item-wrapper">
        <div class="item-title"  :class="{active:currentSelection===itemData}">

          <!-- item是否可见控制 -->
          <div class="editor-visible" :class="{'editor-hide':itemData.editorHide,'none':itemData.constructor.name ==='UDStage' || itemData.constructor.name ==='UDPage'}" >
            <span class="icon" v-show="!(itemData.constructor.name ==='UDStage' || itemData.constructor.name ==='UDPage')" @click="toggleHide" :title="itemData.editorHide?'编辑器内隐藏':'编辑器内可见'"></span>
          </div>

          <div class="gutter" :style="{width: itemLevel*20 + 'px' }"></div>

          <!-- 子元素展开按钮 -->
          <div class="child-ctl" :class="{open:itemData.hasOwnProperty('__ud_attribute_children__') && itemData.fold,close:itemData.hasOwnProperty('__ud_attribute_children__') && !itemData.fold}" >
            <span class="icon" v-if="itemData.hasOwnProperty('__ud_attribute_children__')  && itemData.children().value.length>0 " @click="toggleFold"></span>
          </div>

          <!-- item图标 -->
          <div :class="{['icon-'+itemType]:true,'icon-item':true}"  @click="selectItem">
            <span class="icon-2" v-if="'UDImage'!==itemType"></span>
            <span class="icon-default" v-if="'UDImage'===itemType && !itemData[`__ud_attribute_url__`].value"></span>
            <img v-if="'UDImage'===itemType && itemData[`__ud_attribute_url__`].value" :src="itemData[`__ud_attribute_url__`].value">
          </div>


          <!-- item名称 -->
          <div class="item-name" :style="{'max-width':(150 - (itemLevel*20) )+'px'}" :title="itemData.name().value"   @click="selectItem">{{itemData.name().value}}</div>

          <div class="has-event">
            <!-- <span class="icon" v-if="true"></span> -->
            <span class="icon"  @click="selectItemEvent"  v-if="itemData.eventHandlers().value.length>0" :class="{active:currentScene===SCENE.EVENT_PANEL && currentSelection===itemData}"></span>
          </div>

        </div>


        <template v-if="!itemData.fold &&  itemData.children && itemData.children().value && itemData.children().value.length>0">
          <object-item  v-for="item in itemData.children().value" :key="item._id().value" :item-data="item"  :item-id="item._id().value" :item-level="itemLevel+1"></object-item>
        </template>
        
        

      </div>
        
    </div>
</template>

<script>


import { mapGetters,mapState } from 'vuex'
import SCENE  from '../../../../../../../../model/ui-scene.js'
export default {
  name: 'object-item',
  props: ['itemId','itemLevel'],
  // props: ['itemData'],
  data(){
    return {
        SCENE //必须放在data里，否则vue模板里没法直接使用SCENE进行比较
    }
  },
   computed: {
     ...mapState({
      currentSelection (state) {
        return state.selection.currentSelect
      },
      currentScene (state) {
        return state.selection.scene
      }
    }),
    // item渲染的对象（根据prop的id去vuex里查询出来的 FIXME:这里如果prop里传入的id改变了，这个itemData会不会自动变化，需要进一步验证）
    itemData () {
      return this.$store.getters.item(this.itemId)
    },
    // item对象的类型
    itemType () {
      return this.$store.getters.item(this.itemId).constructor.getTypeName()
    },
    // currentSelection () {
    //   return this.$store.currentSelect
    // },
  },
  methods:{

    selectItemEvent(){
      this.$store.commit('selectItem',{
        item:this.itemData,
        scene:SCENE.EVENT_PANEL
      });
    },
    selectItem(){
      this.$store.commit('selectItem',{
        item:this.itemData,
        scene:SCENE.OBJECT_TREE
      });
    },
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
    // position: absolute;
    // top: 30px;
    // left: 0;
    // right: 35px;
    // bottom: 30px;
    min-width: 245px;
    background: #232323;
    // border-right: 1px solid #151515;
    // border-right: 1px solid #faba32;
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

    // border: solid 1px #000;
    border-left: solid 1px #000;
    border-right: solid 1px #000;
    border-bottom: solid 1px #000;
  // 用于控制item缩进的间隔
  .gutter{
    display: inline-block;
    height:20px;
  }

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
  // 如果item没有编辑器可见区域，则背景色使用父亲的
  .editor-visible.none{
    background:inherit;
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

  //元素图标
  .icon-item{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    cursor: pointer;
    img {
      width:100%;
      height:100%;
    }
  }
  // 矩形图标
  .icon-UDRectangle .icon-2 {
      width: 16px;
      height: 16px;
      background-position:  -1520px 0;
  }
  // 圆形图标
  .icon-UDCircle .icon-2 {
      width: 16px;
      height: 16px;
      background-position:  -1560px 0;
  }
  // 输入框图标
  .icon-UDInput .icon-2 {
      width: 16px;
      height: 16px;
      background-position:  -800px -160px;
  }
  // 多行输入框图标
  .icon-UDMultiInput .icon-2 {
      width: 16px;
      height: 16px;
      background-position:  -1600px -160px;
  }
  
  
  // 线条图标
  .icon-UDLine .icon-2 {
      width: 16px;
      height: 16px;
      background-position:  -1640px 0;
  }
  // 文本图标
  .icon-UDText .icon-2 {
      width: 16px;
      height: 16px;
      background-position:  -1400px 0;
  }
  // 页面图标
  .icon-UDPage .icon-2 {
      width: 16px;
      height: 16px;
      background-position: -1320px 0;
  }
  // 容器图标
  .icon-UDUIContainer .icon-2 {
      width: 16px;
      height: 16px;
      background-position:  -1720px 0;
  }
  // 图片图标
  .icon-UDImage .icon-default {
      width: 16px;
      height: 16px;
      background: url(./assets/img/image.svg) no-repeat;
      background-position:  0px 0px;
  }

  // 舞台名称
  .item-name {
    // padding-left: 18px;
    padding-left: 8px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: inline-block;
      cursor: pointer;
    // max-width:150px;
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
.item-title.active {
  background: #39311f;
}

</style>
