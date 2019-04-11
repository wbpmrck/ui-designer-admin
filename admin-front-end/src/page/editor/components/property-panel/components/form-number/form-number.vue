<template>     
     <div class="form-number">
         <el-input-number v-model="val" @change="handleChange" :precision="param.precision" :step="param.step" :max="param.max" :min="param.min" controls-position="right" size="mini"></el-input-number>
     </div>
</template>

<script>

export default {
  name: 'form-number',
  props: ['objectId','propName','propInitVal','param'],
  components: {
  },
  data(){
    return {
      val:0
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
          console.log('formNumber Prop changed: ', newVal, ' | was: ', oldVal)
      this.val = newVal;
    }
  }
}
</script>

<style lang="scss" scoped>

.form-number {    
}
</style>
