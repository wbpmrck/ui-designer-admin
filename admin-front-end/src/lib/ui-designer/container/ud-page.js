import UDContainer from './ud-container'
import UDEvent from '../ud-event'
import {regEnums,regClass,createClassObject,Types,DECORATORS,field,UDAttribute} from "../ud-runtime"
import {UDAttributeUnit} from '../enums/ud-unit'
import UDClipMode from "../enums/ud-clip-mode"
import UDDeviceEnv from '../enums/ud-device-env'
import UDTouchTurnPageEnum from '../enums/ud-touch-turn-page-enum'

const className = 'UDPage'
/**
 * 表示一个页面。一个页面代表一个应用场景。页面是应用进行场景控制和变化的核心对象
 */
@DECORATORS.serializable(true)
class UDPage extends UDContainer{
    
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
            new UDEvent({name:'beforeEnter',desc:'页面场景进入前',contextParams:[
                new UDAttribute({name:'params',desc:'场景参数',valueType:Types.ARRAY(String.getType())})
            ]}),
            new UDEvent({name:'afterEnter',desc:'页面场景进入后',contextParams:[
                new UDAttribute({name:'params',desc:'场景参数',valueType:Types.ARRAY(String.getType())})
            ]}),
            new UDEvent({name:'beforeLeave',desc:'页面场景离开前',contextParams:[
            ]}),
            new UDEvent({name:'afterLeave',desc:'页面场景离开后',contextParams:[
            ]}),
        ]);
    }

    /**
     * 获取该对象支持的行为
     */
    static getSupportActions(){
        return super.getSupportActions().concat([
            new UDAction({name:'scrollToObject',desc:'滚动到某对象',params:[
                new UDAttribute({name:'target',desc:'目标对象',valueType:Types.UDObjectID}),
                new UDAttribute({name:'offsetY',desc:'Y轴距离目标对象的位移',value:0,valueType:Number.getType(),unit:UDAttributeUnit.PX})
            ]}),
            new UDAction({name:'scrollTo',desc:'滚动到某位置',params:[
                new UDAttribute({name:'offsetY',desc:'滚动到Y轴的目标位置',value:0,valueType:Number.getType(),unit:UDAttributeUnit.PX})
            ]}),
        ]);
    }



    /*
        1.大小
    */
  

   @DECORATORS.serializable(true)
   @DECORATORS.field({type:Number.getType(),desc:'x坐标',value:0,unit:UDAttributeUnit.PX})
   x(){};
   
   @DECORATORS.serializable(true)
   @DECORATORS.field({type:Number.getType(),desc:'y坐标',value:0,unit:UDAttributeUnit.PX})
   y(){};

   @DECORATORS.serializable(true)
   @DECORATORS.field({type:Number.getType(),desc:'页面宽度',value:0,unit:UDAttributeUnit.PX})
   w(){};

   @DECORATORS.serializable(true)
   @DECORATORS.field({type:Number.getType(),desc:'页面高度',value:0,unit:UDAttributeUnit.PX})
   h(){};

   @DECORATORS.serializable(true)
   @DECORATORS.field({type:Number.getType(),desc:'z轴',value:0,unit:UDAttributeUnit.PX})
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


   /*
       3.内容控制
   */

 
    
  @DECORATORS.serializable(true)
  @DECORATORS.field({type:UDClipMode.getType(),desc:'X轴剪切',value:UDClipMode.CLIP})
  clipX(){};
  
  @DECORATORS.serializable(true)
  @DECORATORS.field({type:UDClipMode.getType(),desc:'Y轴剪切',value:UDClipMode.CLIP})
  clipY(){};



    // constructor({typeName,serializedString}) {
    constructor() {
        super();
    }
}
regClass(className,UDPage)

export default UDPage;