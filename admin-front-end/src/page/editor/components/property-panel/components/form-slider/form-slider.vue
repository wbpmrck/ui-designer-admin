<template>     
     <div class="form-slider">
      <el-slider v-model="val" @change="handleChange" :step="param.step" :max="param.max" :min="param.min" ></el-slider>
     </div>
</template>

<script>

export default {
  name: 'form-slider',
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
          console.log('slider Prop changed: ', newVal, ' | was: ', oldVal)
      this.val = newVal;
    }
  }
}
</script>

<style lang="scss" scoped>

.form-slider {    
}
</style>
