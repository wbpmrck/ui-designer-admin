<template>
  <div class="panel" :id="id">
   <slot></slot>
  </div>
</template>

<script>
/*
  panel:具备停靠、伸缩能力的面板

  1、可自定义高度、宽度，停靠方向，是否允许拖动等
  2、可自定义底部栏、顶部栏
*/
export default {
  name: 'panel',
  props: {
    id:String,
    dragControlId:String,
    draggable:{
      type: Boolean,
      default: true
    }
  },
  mounted(){
    // 初始化拖动
    if(this.draggable){
      // alert('draggable')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.panel {  
  width: 100%;
  /* height: 100%; */
}

</style>
