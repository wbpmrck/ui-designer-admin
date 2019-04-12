<template>     
     <div class="form-color-picker">
      <el-color-picker v-model="val"  @change="handleChange" size="mini" :predefine="predefineColors"></el-color-picker>
     </div>
</template>

<script>

export default {
  name: 'form-color-picker',
  props: ['objectId','propName','propInitVal','param'],
  components: {
  },
  data(){
    return {
      val:'',
       predefineColors: [
          '#ff4500',
          '#ff8c00',
          '#ffd700',
          '#90ee90',
          '#00ced1',
          '#1e90ff',
          '#c71585',
          'rgb(255, 120, 0)',
          'hsv(51, 100, 98)',
          'hsl(181, 100%, 37%)',
        ]
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
      this.val = newVal;
    }
  }
}
</script>

<style lang="scss" scoped>

.form-color-picker {    
}
</style>
