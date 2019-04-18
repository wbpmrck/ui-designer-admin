import UDObject from '../ud-object'
import UDEvent from '../ud-event'
import {UDAttributeUnit}  from "../enums/ud-unit"
import UDTouchEventContext from "../gesture/ud-touch-event-context"
import UDTouch from "../gesture/ud-touch"
import UDRange from "../enums/ud-range"
import UDAction from "../ud-action"
import {regEnums,regClass,createClassObject,Types,DECORATORS,field,UDAttribute} from "../ud-runtime"

const className = 'UDUIObject'
/**
 * 表示可以被展示和显示的界面元素基类
 */
@DECORATORS.serializable(true)
class UDUIObject extends UDObject{
    
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
            new UDAction({name:'show',desc:'显示对象',params:[]}),
            new UDAction({name:'hide',desc:'隐藏对象',params:[]}),
            new UDAction({name:'toggleShow',desc:'交替显示/隐藏对象',params:[]}),
            new UDAction({name:'placeZindexTop',desc:'置于顶层',params:[
                new UDAttribute({name:'range',desc:'适用范围',valueType:UDRange.getType()})
            ]}),
            new UDAction({name:'placeZindexBottom',desc:'置于底层',params:[
                new UDAttribute({name:'range',desc:'适用范围',valueType:UDRange.getType()})
            ]})
        ]);
    }


    @DECORATORS.serializable(true)
    @DECORATORS.field({type:Number.getType(),desc:'z轴刻度',value:0,unit:UDAttributeUnit.PX})
    z(){};

    /*
        2.背景和透明度
    */

    @DECORATORS.serializable(true)
    @DECORATORS.field({type:Number.getType(),desc:'不透明度',value:100,unit:UDAttributeUnit.PERCENTAGE})
    alpha(){};

    @DECORATORS.serializable(true)
    @DECORATORS.field({type:String.getType(),desc:'背景色',value:''})
    bgColor(){};

    // constructor({typeName,serializedString}) {
    constructor() {
        super();
    }
}
regClass(className,UDUIObject)

export default UDUIObject;