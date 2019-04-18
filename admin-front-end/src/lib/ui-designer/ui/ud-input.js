import UDTextBase from './ud-text-base'
import UDInputType from "../enums/ud-input-type"
import {UDAttributeUnit}  from "../enums/ud-unit"
import {regEnums,regClass,createClassObject,Types,DECORATORS,field,UDAttribute} from "../ud-runtime"

const className = 'UDInput'
/**
 * 单行文本输入框
 */
@DECORATORS.serializable(true)
class UDInput extends UDTextBase{
    
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
    @DECORATORS.field({type:String.getType(),desc:'输入内容',value:""})
    value(){};

    @DECORATORS.serializable(true)
    @DECORATORS.field({type:String.getType(),desc:'提示文本',value:""}) 
    placeholder(){};

    @DECORATORS.serializable(true)
    @DECORATORS.field({type:String.getType(),desc:'提示字色',value:'#8499B5'})
    phColor(){};

    @DECORATORS.serializable(true)
    @DECORATORS.field({type:Number.getType(),desc:'最大长度',value:50}) 
    maxLen(){};

    @DECORATORS.serializable(true)
    @DECORATORS.field({type:UDInputType.getType(),desc:'输入类型',value:UDInputType.TEXT})
    inputType(){};
 

    // constructor({typeName,serializedString}) {
    constructor() {
        super();
    }
}
regClass(className,UDInput)

export default UDInput;