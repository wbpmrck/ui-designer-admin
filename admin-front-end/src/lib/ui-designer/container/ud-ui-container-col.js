import UDEvent from '../ud-event'
import UDObject from "../ud-object"
import UDAction from "../ud-action"
import UDClipMode from "../enums/ud-clip-mode"
import UDColAlignH from "../enums/ud-col-align-h"
import UDColAlignV from "../enums/ud-col-align-v"
import {
    UDAttributeUnit
} from '../enums/ud-unit'
import {
    regEnums,
    regClass,
    createClassObject,
    Types,
    DECORATORS,
    field,
    UDAttribute,

} from "../ud-runtime"
import UDUIContainer from './ud-ui-container';

const className = 'UDUIContainerCol'
/**
 * 表示可以被展示和显示的界面元素的容器
 * 注：UIContainer本身也是参与布局和渲染的
 */

@DECORATORS.serializable(true)
class UDUIContainerCol extends UDUIContainer {

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


    @DECORATORS.serializable(true)
    @DECORATORS.field({
        type: Number.getType(),
        desc: '内边距(上)',
        value: 0,
        unit: UDAttributeUnit.PX
    })
    paddingTop() {};

    @DECORATORS.serializable(true)
    @DECORATORS.field({
        type: Number.getType(),
        desc: '内边距(右)',
        value: 0,
        unit: UDAttributeUnit.PX
    })
    paddingRight() {};

    @DECORATORS.serializable(true)
    @DECORATORS.field({
        type: Number.getType(),
        desc: '内边距(下)',
        value: 0,
        unit: UDAttributeUnit.PX
    })
    paddingBottom() {};

    @DECORATORS.serializable(true)
    @DECORATORS.field({
        type: Number.getType(),
        desc: '内边距(左)',
        value: 0,
        unit: UDAttributeUnit.PX
    })
    paddingLeft() {};



    @DECORATORS.serializable(true)
    @DECORATORS.field({
        type: UDColAlignH.getType(),
        desc: '水平布局',
        value: UDColAlignH.LEFT
    })
    colAlignH() {};

    @DECORATORS.serializable(true)
    @DECORATORS.field({
        type: UDColAlignV.getType(),
        desc: '垂直布局',
        value: UDColAlignV.TOP
    })
    colAlignV() {};


    @DECORATORS.serializable(true)
    @DECORATORS.field({
        type: Boolean.getType(),
        desc: '自动换行',
        value: true
    })
    autoWrap() {};

    /**
     * 如果该对象有子元素，那么子元素的哪些属性需要被禁用
     */
    getDisableChildrenProps() {
        return ['x', 'y', 'ex', 'ey', 'bx', 'by'];
    }

    constructor() {
        super()
    }
}
regClass(className, UDUIContainerCol)

export default UDUIContainerCol;