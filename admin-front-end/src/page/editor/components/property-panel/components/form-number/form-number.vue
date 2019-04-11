<template>     
     <div class="form-number">
         <el-input-number v-model="val" :precision="2" :step="0.1" :max="10" controls-position="right"></el-input-number>
     </div>
</template>

<script>

export default {
  name: 'form-number',
  props: {
  },
  components: {
  },
  data(){
    return {
      val:0
    }
  },
  methods:{
  }
}
</script>

<style lang="scss" scoped>

.form-number {    
}
</style>
