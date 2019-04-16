import UDContainer from './ud-container'
import UDEvent from '../ud-event'
import {regEnums,regClass,createClassObject,Types,DECORATORS,field,UDAttribute} from "../ud-runtime"
import {UDAttributeUnit} from '../enums/ud-unit'
import UDDeviceEnv from '../enums/ud-device-env'
import UDTouchTurnPageEnum from '../enums/ud-touch-turn-page-enum'

const className = 'UDStage'
/**
 * 表示一个应用。是应用的根元素
 */
@DECORATORS.serializable(true)
class UDStage extends UDContainer{
    
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
            new UDEvent({name:'deviceRotate',desc:'设备旋转',contextParams:[
                new UDAttribute({name:'angle',desc:'旋转角度',valueType:Number.getType(),unit:UDAttributeUnit.ANGLE})
            ]}),
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
   @DECORATORS.field({type:Number.getType(),desc:'设计宽度',value:0,unit:UDAttributeUnit.PX})
   w(){};

   @DECORATORS.serializable(true)
   @DECORATORS.field({type:Number.getType(),desc:'设计高度',value:0,unit:UDAttributeUnit.PX})
   h(){};

    /*
        2.运行环境相关
    */
  
   @DECORATORS.serializable(true)
   @DECORATORS.field({type:UDDeviceEnv.getType(),desc:'设备环境',value:UDDeviceEnv.MOBILE})
   deviceEnv(){};

    /*
        3.运行模式相关
    */
  
   @DECORATORS.serializable(true)
   @DECORATORS.field({type:Boolean.getType(),desc:'启动预加载',value:true})
   preloadEnable(){};

   @DECORATORS.serializable(true)
   @DECORATORS.field({type:Boolean.getType(),desc:'允许用户缩放',value:false})
   userScaleEnable(){};


    /*
        4.场景控制相关
    */
  
   @DECORATORS.serializable(true)
   @DECORATORS.field({type:UDTouchTurnPageEnum.getType(),desc:'滑动翻页模式',value:UDTouchTurnPageEnum.NONE})
   touchTurnPage(){};

    // constructor({typeName,serializedString}) {
    constructor() {
        super();
    }
}
regClass(className,UDStage)

export default UDStage;