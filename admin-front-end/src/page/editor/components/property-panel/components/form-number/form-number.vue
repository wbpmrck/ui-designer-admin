<template>     
     <div class="form-number">
         <el-input-number v-model="val" :precision="param.precision" :step="param.step" :max="param.max" :min="param.min" controls-position="right" size="mini"></el-input-number>
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
      console.log(`formText new val:${val}`)
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
}
</script>

<style lang="scss" scoped>

.form-number {    
}
</style>
