<template>
    <div class="image"  :class="{disabled:disable}">
     
    </div>
</template>

<script>

import { mapGetters,mapState } from 'vuex'
import SCENE from '../../../../../../model/ui-scene.js'
export default {
  name: 'tool-image', //FIXME:加tool前缀是考虑到vue不推荐使用内置的关键字image做组件名称
  props: [],
  // props: ['itemData'],
  data(){
    return {
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
    disable(){
      if(this.currentScene=== SCENE.OBJECT_TREE && this.currentSelection && this.currentSelection.children){
        return false;
      }else{
        return true;
      }
    }
  },
  methods:{

  },
  created() {
  }
}
</script>

<style lang="scss" scoped>

.image {
    display: inline-block;
    width: 100%;
    height: 100%;
    background: url(./assets/img/image.svg) no-repeat;
}

</style>
