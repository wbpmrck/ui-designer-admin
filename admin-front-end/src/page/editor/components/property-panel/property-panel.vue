<template>

      <panel id="property-panel" :class="{'after-tool-expand':isToolBoxExpand}" v-if="currentSelection">
        <div id="property-panel-header">
          <div class="object-name text-ellipsis">{{currentSelection.name().value}}</div>
          <div class="text">的属性</div>
        </div>
      </panel>
    
</template>

<script>

import panel from '../../../../components/panel/panel'
import { mapGetters,mapState } from 'vuex'
import SCENE from '../../../../model/ui-scene.js'
import formText from './components/form-text/form-text'
import formImage from './components/form-image/form-image'
import formSlider from './components/form-slider/form-slider'
import formNumber from './components/form-number/form-number'
import formSwitch from './components/form-switch/form-switch'
import formColorPicker from './components/form-color-picker/form-color-picker'

import {FormLine,FormGroup} from './form-group.js'

// 分组配置
const groupConfig =[
        {
          name:'基本信息',
          props:[
            { 
              field:'name',
              form:[{
                type:formText,
                col:24 //24栏，表示这个表单占据一整行
              }]
            }, //对象的ID
            { 
              field:'url',
              form:[{
                type:formImage,
                col:24 //24栏，表示这个表单占据一整行
              }]
            }, //图片资源地址
          ]
        },
        {
          name:'位置信息',
          props:[
            { 
              field:'x',
              form:[{
                type:formNumber,
                  param:{
                    precision:0, //精度，整数
                  },
                col:12 //12栏，表示这个表单占半行
              }]
            }, 
            { 
              field:'y',
              form:[{
                type:formNumber,
                  param:{
                    precision:0, //精度，整数
                  },
                col:12 //12栏，表示这个表单占半行
              }]
            }, 
            { 
              field:'w',
              form:[{
                type:formNumber,
                  param:{
                    precision:0, //精度，整数
                  },
                col:12 //12栏，表示这个表单占半行
              }]
            }, 
            { 
              field:'h',
              form:[{
                type:formNumber,
                  param:{
                    precision:0, //精度，整数
                  },
                col:12 //12栏，表示这个表单占半行
              }]
            }, 
            { 
              field:'z',
              form:[{
                type:formNumber,
                  param:{
                    precision:0, //精度，整数
                  },
                col:24 //24栏，表示这个表单占据一整行
              }]
            }, 
          ]
        },
        {
          name:'背景和边框',
          props:[
           { 
              field:'alpha',
              form:[
                {
                  type:formNumber,
                  param:{
                    min:0,
                    max:0,
                    precision:2, //精度，保留2位小数
                  },
                  col:12 //12栏，表示这个表单占据半行
                },
                {
                  type:formSlider,
                  param:{
                    min:0,
                    max:0,
                    precision:2, //精度，保留2位小数
                  },
                  col:12 //12栏，表示这个表单占据半行
                }
              ]
            }, 
            { 
              field:'bgColor',
              form:[
                {
                  type:formColorPicker,
                  col:24
                }
              ]
            }, 
          ]
        },
      ];


      function findFieldConfig(object){

        let forms =[];

        groupConfig.forEach((group)=>{
          let g = undefined;
          console.log('forEach1')
          console.log(group.name)
          
          group.props.forEach((field)=>{
          console.log('forEach2')
          console.log(field.field)
              if(object[field.field] && object[field.field].__ud_attribute__){
                if(!g){
                  g = new FormGroup(group.name);
                  forms.push(g);
                }
                g.addField(field);
              }
          });

        })

        console.log('forms=')
        console.log(forms)
        return forms;
      }

export default {
  name: 'property-panel',
  props: {
  },
  components: {
    panel,
    formColorPicker,
    formText,
    formImage,
    formSlider,
    formNumber,
    formSwitch
  },
   computed: {
     ...mapState({
      currentSelection (state) {
        return state.selection.currentSelect
      },
      currentSelectTool (state) {
        return state.selection.currentSelectTool
      },
      isToolBoxExpand (state) {
        return state.editor.toolBox.isExpand
      },
      currentScene (state) {
        return state.selection.scene
      }
    }),
    forms(){
      //TODO:分析 currentSelection ,对比group配置，生成一个当前选择的对象的属性分组对象。用来绑定到属性面板
      return findFieldConfig(this.currentSelection);
    }
  },
  data(){
    return {
      SCENE,
    }
  },
  methods:{
  
  }
}
</script>

<style lang="scss" scoped>

// 属性面板
#property-panel {    
    position: absolute;
    top: 36px;
    left: 37px;
    width: 260px;
    background: #232323;
    max-height: 100%;
    overflow: hidden;
    z-index: 51;
    transition: initial;
}
// 如果工具箱展开状态
#property-panel.after-tool-expand{
    left: 65px;
}

// 面板顶部
#property-panel-header{
    background-color: #353535;
    color: #b5b5b5;
    font-size: 12px;
    font-weight: 400;
    margin: 0;
    padding: 4px 12px;
    height: 30px;
    min-height: 30px;
    line-height: 22px;

    display: flex;
    flex-direction: row;
    align-items: center;

    // 对象名称
    .object-name {
      display: inline-block;
      max-width: 175px;
      margin-right: 1px;
    }
    .text {
      display: inline-block;
    }
}

</style>
