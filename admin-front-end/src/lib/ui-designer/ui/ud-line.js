import {UDAttributeUnit}  from "../enums/ud-unit"
import {regEnums,regClass,createClassObject,Types,DECORATORS,field,UDAttribute} from "../ud-runtime"
import UDUIOneDim from './ud-ui-one-dim';

const className = 'UDLine'
/**
 * 一条线
 */
@DECORATORS.serializable(true)
class UDLine extends UDUIOneDim{
    
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


    /*
        1.位置相关
    */
   @DECORATORS.serializable(true)
   @DECORATORS.field({type:Number.getType(),desc:'起点X',value:0,unit:UDAttributeUnit.PX})
   fx(){};
   
   @DECORATORS.serializable(true)
   @DECORATORS.field({type:Number.getType(),desc:'起点Y',value:0,unit:UDAttributeUnit.PX})
   fy(){};
   
   @DECORATORS.serializable(true)
   @DECORATORS.field({type:Number.getType(),desc:'终点X',value:0,unit:UDAttributeUnit.PX})
   ex(){};
   
   @DECORATORS.serializable(true)
   @DECORATORS.field({type:Number.getType(),desc:'终点Y',value:0,unit:UDAttributeUnit.PX})
   ey(){};
    // constructor({typeName,serializedString}) {
    constructor() {
        super();
    }
}
regClass(className,UDLine)

export default UDLine;