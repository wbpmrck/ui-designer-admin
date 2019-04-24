<template>
  <panel id="property-panel" class="scrollable-1" :class="{'after-tool-expand':isToolBoxExpand}" v-if="currentSelection">
    <div id="property-panel-header">
      <div class="object-name text-ellipsis">{{currentSelection.name().value}}</div>
      <div class="text">的属性</div>
    </div>

    <div class="prop-group" v-for="group in forms" :key="currentSelection._id().value+group.name">
      <div class="prop-group-name">
        <span class="text">{{group.name}}</span>
        <span class="icon" :class="{open:group.collapsed}" @click="toggleCollapseGroup(group)" :title="group.collapsed?'点击展开':'点击收起'"></span>
      </div>

      <div class="prop-group-content" v-show="!group.collapsed">
        <el-row :gutter="10" v-for="(line ,index1) in group.lines" :key="currentSelection._id().value+group.name+index1">
          <el-form label-width="55px" :key="currentSelection._id().value+group.name+index1">
            <template v-for="(field,index2 ) in line.fields">
              <el-col :span="formItem.col" v-for="(formItem ,index3) in field.form" :key="currentSelection._id().value+group.name+index1+''+index2+''+index3">
                <!-- 属性标签trick:如果group配置里有desc,则使用desc.否则直接使用runtime从ud领域带过来的设计者附加在属性上的描述信息 -->
                <el-form-item :label="index3===0?field.desc||currentSelection[field.field]().desc:''" :class="{first:index3===0}">
                  <!-- <component v-bind:is="formItem.type" @change="handleFieldChange.bind(field.field)"></component> -->
                  <!-- <component v-bind:is="formItem.type" @change="handleFieldChange(field.field)"></component> -->
                  <!-- <component v-bind:is="formItem.type" :param="formItem.param" :prop-name="field.field" :object-id="currentSelection._id().value" :prop-init-val="currentSelection[field.field]().value" ></component> -->
                  <component
                    v-bind:is="formItem.type"
                    :param="formItem.param"
                    :prop-name="field.field"
                    :object-id="currentSelection._id().value"
                    :prop-init-val="currentSelection[field.field]() && currentSelection['__ud_attribute_'+field.field+'__'].value"
                  ></component>
                  <!-- <component v-bind:is="formItem.type" :param="formItem.param" :prop-name="field.field" :object-id="currentSelection._id().value" :prop-init-val="currentSelection" ></component> -->
                  <!-- <component v-bind:is="formItem.type" :param="formItem.param" :prop-name="field.field" :object-id="currentSelection._id().value" :prop-init-val="currentSelection[field.field]() && currentSelection['__ud_attribute_'+field.field+'__']?currentSelection['__ud_attribute_'+field.field+'__'].value" ></component> -->
                </el-form-item>
                <!-- <div class="filed-name" v-if="index3===0">{{field.desc}}:</div> -->
              </el-col>
              <!-- <el-col :span="2" :key="group.name+index1+''+index2">{{field.field}}</el-col> -->
            </template>
          </el-form>
        </el-row>
      </div>
    </div>
  </panel>
</template>

<script>
  import panel from '../../../../components/panel/panel';
  import { mapGetters, mapState } from 'vuex';
  import SCENE from '../../../../model/ui-scene.js';
  import formText from './components/form-text/form-text';
  import formImage from './components/form-image/form-image';
  import formSlider from './components/form-slider/form-slider';
  import formNumber from './components/form-number/form-number';
  import formSwitch from './components/form-switch/form-switch';
  import formColorPicker from './components/form-color-picker/form-color-picker';
  import formDropDown from './components/form-dropdown/form-dropdown';

  import { FormLine, FormGroup } from './form-group.js';

  // 分组配置

  export default {
    name: 'property-panel',
    props: {},
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
        currentSelection(state) {
          return state.selection.currentSelect;
        },
        currentSelectTool(state) {
          return state.selection.currentSelectTool;
        },
        isToolBoxExpand(state) {
          return state.editor.toolBox.isExpand;
        },
        currentScene(state) {
          return state.selection.scene;
        }
      })

      // forms(){

      //   //TODO:分析 currentSelection ,对比group配置，生成一个当前选择的对象的属性分组对象。用来绑定到属性面板
      //   return findFieldConfig(this.currentSelection);
      // }
    },
    watch: {
      // 如果 `question` 发生改变，这个函数就会运行
      currentSelection: function(newQuestion, oldQuestion) {
        let self = this;
        function findFieldConfig(object) {
          let forms = [];

          self.groupConfig.forEach(group => {
            let g = undefined;
            // console.log('forEach1')
            // console.log(group.name)

            group.props.forEach(field => {
              // console.log('forEach2')
              // console.log(field.field)
              if (object[field.field] && object[field.field].__ud_attribute__) {
                if (!g) {
                  g = new FormGroup(group.name, group.collapsed);
                  forms.push(g);
                }
                g.addField(field);
              }
            });
          });

          // console.log('forms=')
          // console.log(forms)
          return forms;
        }

        // console.log('change forms')
        this.forms = [];
        this.forms = findFieldConfig(this.currentSelection);
      }
    },
    data() {
      return {
        SCENE,

        forms: [],

        groupConfig: [
          {
            name: '基本信息',
            collapsed: false,
            props: [
              {
                field: 'name',
                desc: 'ID',
                form: [
                  {
                    type: formText,
                    col: 24 //24栏，表示这个表单占据一整行
                  }
                ]
              }, //对象的ID
              {
                field: 'url',
                desc: '资源URL',
                form: [
                  {
                    type: formImage,
                    col: 24 //24栏，表示这个表单占据一整行
                  }
                ]
              }, //图片资源地址
              {
                field: 'txt',
                desc: '内容',
                form: [
                  {
                    type: formText,
                    col: 24 //24栏，表示这个表单占据一整行
                  }
                ]
              }, //文本类组件的文本内容
              {
                field: 'value',
                desc: '输入内容',
                form: [
                  {
                    type: formText,
                    col: 24 //24栏，表示这个表单占据一整行
                  }
                ]
              } //input组件的文本内容
            ]
          },

          {
            name: '输入设置',
            collapsed: false,
            props: [
              {
                field: 'placeholder',
                desc: '提示文本',
                form: [
                  {
                    type: formText,
                    col: 24 //24栏，表示这个表单占据一整行
                  }
                ]
              },
              {
                field: 'phColor',
                desc: '提示颜色',
                form: [
                  {
                    type: formColorPicker,
                    col: 10
                  },
                  {
                    type: formText,
                    col: 14
                  }
                ]
              },

              {
                field: 'maxLen',
                desc: '最大长度',
                form: [
                  {
                    type: formNumber,
                    param: {
                      precision: 0, //精度，保留2位小数
                      step: 1, //增加的步长
                      min: 0,
                      max: 99999 //最大值
                    },
                    col: 12 //12栏，表示这个表单占据半行
                  },
                  {
                    type: formSlider,
                    param: {
                      step: 1, //增加的步长
                      min: 0,
                      max: 99999 //最大值
                    },
                    col: 12 //12栏，表示这个表单占据半行
                  }
                ]
              },
              {
                field: 'inputType',
                desc: '输入类型',
                form: [
                  {
                    type: formDropDown,
                    param: {},
                    col: 24
                  }
                ]
              },
              {
                field: 'forbidEnter',
                desc: '禁用回车',
                form: [
                  {
                    type: formSwitch,
                    param: {},
                    col: 12
                  }
                ]
              }
            ]
          },

          {
            name: '环境和模式',
            collapsed: false,
            props: [
              {
                field: 'deviceEnv',
                desc: '设备类型',
                form: [
                  {
                    type: formDropDown,
                    param: {},
                    col: 24
                  }
                ]
              },
              {
                field: 'preloadEnable',
                desc: '预加载',
                form: [
                  {
                    type: formSwitch,
                    param: {},
                    col: 12
                  }
                ]
              },
              {
                field: 'userScaleEnable',
                desc: '用户缩放',
                form: [
                  {
                    type: formSwitch,
                    param: {},
                    col: 12
                  }
                ]
              }
            ]
          },

          {
            name: '页面场景控制',
            collapsed: false,
            props: [
              {
                field: 'touchTurnPage',
                desc: '滑动翻页',
                form: [
                  {
                    type: formDropDown,
                    param: {},
                    col: 24
                  }
                ]
              }
            ]
          },
          {
            name: '舞台大小',
            collapsed: false,
            props: [
              {
                field: 'sw',
                // desc:'宽度',
                form: [
                  {
                    type: formNumber,
                    param: {
                      precision: 0, //精度，整数
                      step: 1, //增加的步长
                      max: 99999, //最大值
                      min: 0 //最小值
                    },
                    col: 12 //12栏，表示这个表单占半行
                  }
                ]
              },
              {
                field: 'sh',
                // desc:'高度',
                form: [
                  {
                    type: formNumber,
                    param: {
                      precision: 0, //精度，整数
                      step: 1, //增加的步长
                      max: 99999, //最大值
                      min: 0 //最小值
                    },
                    col: 12 //12栏，表示这个表单占半行
                  }
                ]
              }
            ]
          },

          {
            name: '位置形状',
            collapsed: false,
            props: [
              {
                field: 'bx',
                desc: '起点X',
                form: [
                  {
                    type: formNumber,
                    param: {
                      precision: 0, //精度，整数
                      step: 1, //增加的步长
                      max: 99999, //最大值
                      min: -99999 //最小值
                    },
                    col: 12 //12栏，表示这个表单占半行
                  }
                ]
              },
              {
                field: 'by',
                desc: '起点Y',
                form: [
                  {
                    type: formNumber,
                    param: {
                      precision: 0, //精度，整数
                      step: 1, //增加的步长
                      max: 99999, //最大值
                      min: -99999 //最小值
                    },
                    col: 12 //12栏，表示这个表单占半行
                  }
                ]
              },
              {
                field: 'ex',
                desc: '终点X',
                form: [
                  {
                    type: formNumber,
                    param: {
                      precision: 0, //精度，整数
                      step: 1, //增加的步长
                      max: 99999, //最大值
                      min: -99999 //最小值
                    },
                    col: 12 //12栏，表示这个表单占半行
                  }
                ]
              },
              {
                field: 'ey',
                desc: '终点Y',
                form: [
                  {
                    type: formNumber,
                    param: {
                      precision: 0, //精度，整数
                      step: 1, //增加的步长
                      max: 99999, //最大值
                      min: -99999 //最小值
                    },
                    col: 12 //12栏，表示这个表单占半行
                  }
                ]
              },
              {
                field: 'x',
                desc: 'X坐标',
                form: [
                  {
                    type: formNumber,
                    param: {
                      precision: 0, //精度，整数
                      step: 1, //增加的步长
                      max: 99999, //最大值
                      min: -99999 //最小值
                    },
                    col: 12 //12栏，表示这个表单占半行
                  }
                ]
              },
              {
                field: 'y',
                desc: 'Y坐标',
                form: [
                  {
                    type: formNumber,
                    param: {
                      precision: 0, //精度，整数
                      step: 1, //增加的步长
                      max: 99999, //最大值
                      min: -99999 //最小值
                    },
                    col: 12 //12栏，表示这个表单占半行
                  }
                ]
              },
              {
                field: 'w',
                // desc:'宽度',
                form: [
                  {
                    type: formNumber,
                    param: {
                      precision: 0, //精度，整数
                      step: 1, //增加的步长
                      max: 99999, //最大值
                      min: 0 //最小值
                    },
                    col: 12 //12栏，表示这个表单占半行
                  }
                ]
              },
              {
                field: 'h',
                // desc:'高度',
                form: [
                  {
                    type: formNumber,
                    param: {
                      precision: 0, //精度，整数
                      step: 1, //增加的步长
                      max: 99999, //最大值
                      min: 0 //最小值
                    },
                    col: 12 //12栏，表示这个表单占半行
                  }
                ]
              },
              {
                field: 'z',
                desc: 'Z轴',
                form: [
                  {
                    type: formNumber,
                    param: {
                      precision: 0, //精度，整数
                      step: 1, //增加的步长
                      max: 99999, //最大值
                      min: 0 //最小值
                    },
                    col: 12 //24栏，表示这个表单占据一整行
                  }
                ]
              },
              {
                field: 'strokeWidth',
                desc: '粗细',
                form: [
                  {
                    type: formNumber,
                    param: {
                      precision: 0, //精度，整数
                      step: 1, //增加的步长
                      max: 99999, //最大值
                      min: 0 //最小值
                    },
                    col: 12 //24栏，表示这个表单占据一整行
                  }
                ]
              }
            ]
          },

          {
            name: '字体样式',
            collapsed: false,
            props: [
              {
                field: 'font',
                desc: '字体',
                form: [
                  {
                    type: formDropDown,
                    param: {
                      dropDataList: 'fontFamily'
                    },
                    col: 15
                  }
                ]
              },
              {
                field: 'fs',
                desc: '字号',
                form: [
                  {
                    type: formNumber,
                    param: {
                      precision: 0,
                      step: 1, //增加的步长
                      min: 0,
                      max: 160 //最大值
                    },
                    col: 9
                  }
                ]
              },
              {
                field: 'fontColor',
                desc: '字体颜色',
                form: [
                  {
                    type: formColorPicker,
                    col: 10
                  },
                  {
                    type: formText,
                    col: 14
                  }
                ]
              },
              {
                field: 'alignH',
                desc: '水平对齐',
                form: [
                  {
                    type: formDropDown,
                    param: {},
                    col: 12
                  }
                ]
              },
              {
                field: 'alignV',
                desc: '垂直对齐',
                form: [
                  {
                    type: formDropDown,
                    param: {},
                    col: 12
                  }
                ]
              },
              {
                field: 'bold',
                desc: '加粗',
                form: [
                  {
                    type: formSwitch,
                    param: {},
                    col: 12
                  }
                ]
              },
              {
                field: 'italic',
                desc: '斜体',
                form: [
                  {
                    type: formSwitch,
                    param: {},
                    col: 12
                  }
                ]
              }
            ]
          },
          {
            name: '背景',
            collapsed: false,
            props: [
              {
                field: 'alpha',
                desc: '透明度',
                form: [
                  {
                    type: formNumber,
                    param: {
                      precision: 2, //精度，保留2位小数
                      step: 1, //增加的步长
                      min: 0,
                      max: 100 //最大值
                    },
                    col: 12 //12栏，表示这个表单占据半行
                  },
                  {
                    type: formSlider,
                    param: {
                      step: 0.01, //增加的步长
                      min: 0,
                      max: 100 //最大值
                    },
                    col: 12 //12栏，表示这个表单占据半行
                  }
                ]
              },
              {
                field: 'bgColor',
                desc: '背景色',
                form: [
                  {
                    type: formColorPicker,
                    col: 10
                  },
                  {
                    type: formText,
                    col: 14
                  }
                ]
              }
            ]
          },

          {
            name: '3D旋转',
            collapsed: false,
            props: [
              {
                field: 'rotateX',
                desc: 'X轴旋转',
                form: [
                  {
                    type: formNumber,
                    param: {
                      precision: 0,
                      step: 1, //增加的步长
                      min: 0,
                      max: 360 //最大值
                    },
                    col: 12
                  }
                ]
              },
              {
                field: 'rotateY',
                desc: 'Y轴旋转',
                form: [
                  {
                    type: formNumber,
                    param: {
                      precision: 0,
                      step: 1, //增加的步长
                      min: 0,
                      max: 360 //最大值
                    },
                    col: 12
                  }
                ]
              },
              {
                field: 'rotateZ',
                desc: 'Z轴旋转',
                form: [
                  {
                    type: formNumber,
                    param: {
                      precision: 0,
                      step: 1, //增加的步长
                      min: 0,
                      max: 360 //最大值
                    },
                    col: 12
                  }
                ]
              }
            ]
          },

          {
            name: '内容组织',
            collapsed: false,
            props: [
              {
                field: 'clipX',
                // desc:'设备类型',
                form: [
                  {
                    type: formDropDown,
                    param: {},
                    col: 24
                  }
                ]
              },
              {
                field: 'clipY',
                // desc:'设备类型',
                form: [
                  {
                    type: formDropDown,
                    param: {},
                    col: 24
                  }
                ]
              }
            ]
          },

          {
            name: '边框和阴影',
            collapsed: false,
            props: [
              {
                field: 'borderRadius',
                desc: '圆角',
                form: [
                  {
                    type: formNumber,
                    param: {
                      precision: 0,
                      step: 1, //增加的步长
                      min: -99999,
                      max: 99999 //最大值
                    },
                    col: 12
                  }
                ]
              },
              {
                field: 'borderWidth',
                desc: '边框',
                form: [
                  {
                    type: formNumber,
                    param: {
                      precision: 0,
                      step: 1, //增加的步长
                      min: 0,
                      max: 99999 //最大值
                    },
                    col: 12
                  }
                ]
              },
              {
                field: 'borderColor',
                desc: '边框颜色',
                form: [
                  {
                    type: formColorPicker,
                    col: 10
                  },
                  {
                    type: formText,
                    col: 14
                  }
                ]
              }
            ]
          }
        ]
      };
    },
    methods: {
      toggleCollapseGroup(g) {
        g.collapsed = !g.collapsed;
      },
      toggleFoldAllProps() {
        let collapsed = !this.forms[0].collapsed;
        this.forms.forEach(g => {
          g.collapsed = collapsed;
        });
        return false;
      },
      handleFieldChange(field, val) {
        console.log(`handleFieldChange---field=[${field}],val=[${val}]`);
        this.currentSelection['__ud_attribute_' + field + '__'].value = val;
      }
    },
    created() {
      //注册键盘事件
      hotkeys('Shift+T', this.toggleFoldAllProps);
    },
    beforeDestroy() {
      //释放键盘事件注册
      hotkeys.unbind('Shift+T');
    }
  };
</script>

<style lang="scss" scoped>
  // 属性面板
  #property-panel {
    position: fixed;
    top: 36px;
    bottom: 0;
    left: 37px;
    width: 300px;
    // width: 260px;
    background: #232323;
    max-height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    z-index: 51;
    transition: initial;
  }
  // 如果工具箱展开状态
  #property-panel.after-tool-expand {
    left: 65px;
  }

  // 面板顶部
  #property-panel-header {
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

  // 属性分组
  .prop-group {
    position: relative;
    text-align: left;
    .prop-group-content {
      padding: 12px 15px 12px 0;
    }
    // 分组名称
    .prop-group-name {
      position: relative;
      text-align: left;
      background-color: #353535;
      color: #b5b5b5;
      border-top: solid 1px #000;
      padding-left: 10px;
      height: 30px;
      line-height: 30px;
      .icon {
        width: 32px;
        height: 26px;
        position: absolute;
        top: 0;
        right: 0;
        background-position: -1240px 0;
        cursor: pointer;
      }
      .icon.open {
        background-position: -1160px -400px;
      }
    }

    // 字段名称
    .filed-name {
      display: inline-block;
      width: 65px;
      color: #a0a0a0;
      margin: 0 5px 0 2px;
      font-size: 12px;
      line-height: 1.5;
    }
  }
</style>
