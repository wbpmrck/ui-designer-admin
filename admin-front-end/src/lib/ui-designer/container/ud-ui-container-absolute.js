import UDEvent from '../ud-event'
import UDObject from "../ud-object"
import UDAction from "../ud-action"
import UDClipMode from "../enums/ud-clip-mode"
import {
    regEnums,
    regClass,
    createClassObject,
    Types,
    DECORATORS,
    field,
    UDAttribute
} from "../ud-runtime"
import UDUIContainer from './ud-ui-container';

const className = 'UDUIContainerAbsolute'
/**
 * 表示可以被展示和显示的界面元素的容器
 * 注：UIContainer本身也是参与布局和渲染的
 */

@DECORATORS.serializable(true)
class UDUIContainerAbsolute extends UDUIContainer {

    static getTypeName() {
        return className
    }
    /**
     * 获取该类支持的事件类型。
     * 
     * 定义了一个类型支持的事件，从而可以允许可视化编辑器辅助用户进行相关配置
     */
    static getSupportEvents() {
        return super.getSupportEvents().concat([

        ]);
    }

    /**
     * 获取该对象支持的行为
     */
    static getSupportActions() {
        return super.getSupportActions().concat([

        ]);
    }


    /**
     * 如果该对象有子元素，那么子元素的哪些属性需要被禁用
     */
    getDisableChildrenProps() {
        return ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'];
    }

    constructor() {
        super()
    }
}
regClass(className, UDUIContainerAbsolute)

export default UDUIContainerAbsolute;