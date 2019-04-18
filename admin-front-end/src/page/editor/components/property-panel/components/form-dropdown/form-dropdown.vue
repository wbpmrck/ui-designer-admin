<template>     
     <div class="form-dropdown">
       <el-select v-model="val" @change="handleChange"> 
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
         <!-- <el-input-number v-model="val" @change="handleChange" :precision="param.precision" :step="param.step" :max="param.max" :min="param.min" controls-position="right" size="mini"></el-input-number> -->
     </div>
</template>

<script>

import nameValues from './custom-data/index.js'
export default {
  name: 'form-dropdown',
  props: ['objectId','propName','propInitVal','param'],
  components: {
  },
  data(){
    return {
      valType:'',
      val:0,
      //用来在编辑器内部，对一些特殊的枚举的key做描述转换。如果字典里没有，则下拉框直接使用key作为描述
      keyDescDictionary:{
        'UDDeviceEnv.ANY':'任意设备',
        'UDDeviceEnv.PC':'个人电脑',
        'UDDeviceEnv.MOBILE':'手机',
        'UDDeviceEnv.TABLET':'平板电脑/iPad',
        'UDTouchTurnPageEnum.NONE':'不支持',
        'UDTouchTurnPageEnum.SWIPE_UP':'手指上滑翻页',
        'UDTouchTurnPageEnum.SWIPE_DOWN':'手指下滑翻页',
        'UDTouchTurnPageEnum.SWIPE_LEFT':'手指左滑翻页',
        'UDTouchTurnPageEnum.SWIPE_RIGHT':'手指右滑翻页',
        'UDClipMode.CLIP':'剪切内容',
        'UDClipMode.VISIBLE':'允许内容溢出但不滚动',
        'UDClipMode.SCROLL':'超出内容产生滚动条',
      }
    }
  },
  methods:{
    handleChange(val){
      this.val = val;
      this.$emit('change',val);
      let newVal;

      if(this.valType==='object'){
        newVal = this.itemData[this.propName]().value.constructor.parse(this.val);
      }else{
        newVal = this.val;
      }
        this.$store.commit('updateObjectUDProperty',{
          id:this.objectId,
          // propName:`__ud_attribute_${this.propName}__.value`,
          propName:this.propName,
          propValue:newVal
        });
    }
  },

   computed: {
    // item渲染的对象（根据prop的id去vuex里查询出来的 FIXME:这里如果prop里传入的id改变了，这个itemData会不会自动变化，需要进一步验证）
    itemData () {
      return this.$store.getters.item(this.objectId)
    },
    options(){
      console.log(this.itemData);
      let ops =[];

      //如果绑定的数据值，是一个枚举类型，就直接读取元数据动态创建下拉列表
      if(this.itemData[this.propName]().value.constructor.__ud_all_enums__){
        this.itemData[this.propName]().value.constructor.__ud_all_enums__.forEach((item)=>{

          let desc = this.keyDescDictionary[`${this.itemData[this.propName]().value.constructor.name}.${item.key}`];
          ops.push({
            value:item.val,
            label:desc||item.key
          })
        })
      }else{
        //否则读取属性参数里的键值对名称
        ops = nameValues[this.param.dropDataList]
      }

      return ops;
    }
  },
  created() {
    this.valType = typeof this.propInitVal;
    let theValue;
    switch(this.valType){
      case 'object':
      //如果传入的值是一个对象，则可能是枚举类型
        theValue = this.propInitVal.val;
        break;
      case 'string':
        theValue = this.propInitVal;
        break;
      default:
        break;
    }
    this.val = theValue;
  },
  watch: { 
    propInitVal: function(newVal, oldVal) { // watch it
      this.valType = typeof this.propInitVal;
      if(this.valType==='object'){
        this.val = newVal.val;
      }else{
        this.val = newVal;
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.form-dropdown {    
}
</style>
