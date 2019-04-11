<template>     
     <div class="form-text">
       <!-- <el-input v-bind="$attrs" @change="handleChange"></el-input> -->
       <el-input v-model="val" @input="handleChange"></el-input>
     </div>
</template>

<script>

export default {
  name: 'form-text',
  props: ['objectId','propName','propInitVal','param'],
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
      this.$emit('change',val);


      this.$store.commit('updateObjectUDProperty',{
        id:this.objectId,
        // propName:`__ud_attribute_${this.propName}__.value`,
        propName:this.propName,
        propValue:this.val
      });
    }
  },
  created() {
    this.val = this.propInitVal;
  },
  watch: { 
    propInitVal: function(newVal, oldVal) { // watch it
          console.log('text Prop changed: ', newVal, ' | was: ', oldVal)
      this.val = newVal;
    }
  }
}
</script>

<style lang="scss" scoped>

// 文本输入框
.form-text {    
}
</style>
