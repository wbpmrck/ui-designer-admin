import UDUIObject from './ud-ui-object'
import UDTextAlignH from "../enums/ud-text-align-h"
import UDTextAlignV from "../enums/ud-text-align-v"
import {UDAttributeUnit}  from "../enums/ud-unit"
import {regEnums,regClass,createClassObject,Types,DECORATORS,field,UDAttribute} from "../ud-runtime"

const className = 'UDTextBase'
/**
 * 表示可以处理文本展示类的控件，这是一个虚基类，不应该直接基于本类创建实例。
 */
@DECORATORS.serializable(true)
class UDTextBase extends UDUIObject{
    
    static getTypeName(){
        return className
    }
    /**
     * 获取该类支持的事件类型。
     * 
     * 定义了一个类型支持的事件，从而可以允许可视化编辑器辅助用户进行相关配置
     */
    static getSupportEvents(){
        return super.getSupportEvents().concat([
        ]);
    }

    /**
     * 获取该对象支持的行为
     */
    static getSupportActions(){
        return super.getSupportActions().concat([
        ]);
    }


   @DECORATORS.serializable(true)
   @DECORATORS.field({type:Number.getType(),desc:'字体大小',value:12,unit:UDAttributeUnit.PX})
   fs(){};
   
   @DECORATORS.serializable(true)
   @DECORATORS.field({type:Number.getType(),desc:'行距',value:0,unit:UDAttributeUnit.PX})
   ls(){};
   
   @DECORATORS.serializable(true)
   @DECORATORS.field({type:String.getType(),desc:'字体家族',value:''})
   font(){};

   @DECORATORS.serializable(true)
   @DECORATORS.field({type:String.getType(),desc:'字色',value:''})
   fontColor(){};

   @DECORATORS.serializable(true)
   @DECORATORS.field({type:UDTextAlignH.getType(),desc:'水平对齐',value:UDTextAlignH.CENTER})
   alignH(){};

   @DECORATORS.serializable(true)
   @DECORATORS.field({type:UDTextAlignV.getType(),desc:'垂直对齐',value:UDTextAlignV.TOP})
   alignV(){};

   @DECORATORS.serializable(true)
   @DECORATORS.field({type:Boolean.getType(),desc:'是否加粗',value:false})
   bold(){};

   @DECORATORS.serializable(true)
   @DECORATORS.field({type:Boolean.getType(),desc:'是否斜体',value:false})
   italic(){};

   @DECORATORS.serializable(true)
   @DECORATORS.field({type:Boolean.getType(),desc:'下划线',value:false})
   underline(){};


    // constructor({typeName,serializedString}) {
    constructor() {
        super();
    }
}
regClass(className,UDTextBase)

export default UDTextBase;