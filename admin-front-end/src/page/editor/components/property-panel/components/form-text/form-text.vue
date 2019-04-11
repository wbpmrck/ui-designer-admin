<template>     
     <div class="form-text">
       <!-- <el-input v-bind="$attrs" @change="handleChange"></el-input> -->
       <el-input v-model="val" @input="handleChange"></el-input>
     </div>
</template>

<script>

export default {
  name: 'form-text',
  props: {
  },
  components: {
  },
  data(){
    return {
      val:undefined
    }
  },
  methods:{
    handleChange(val){
      this.val = val;
      console.log(`formText new val:${val}`)
      this.$emit('change',val);
    }
  }
}
</script>

<style lang="scss" scoped>

// 文本输入框
.form-text {    
}
</style>
