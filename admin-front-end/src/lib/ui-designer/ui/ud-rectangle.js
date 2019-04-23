import {
    regEnums,
    regClass,
    createClassObject,
    Types,
    DECORATORS,
    field,
    UDAttribute
} from "../ud-runtime"
import {
    UDAttributeUnit
} from "../enums/ud-unit"
import UDUITwoDim from './ud-ui-two-dim';

const className = 'UDRectangle'
/**
 * 表示可以被展示和显示的界面元素对象
 */
@DECORATORS.serializable(true)
class UDRectangle extends UDUITwoDim {

    static getTypeName() {
        return className
    }
    /**
     * 获取该类支持的事件类型。
     * 
     * 定义了一个类型支持的事件，从而可以允许可视化编辑器辅助用户进行相关配置
     */
    static getSupportEvents() {
        return super.getSupportEvents().concat([]);
    }

    /**
     * 获取该对象支持的行为
     */
    static getSupportActions() {
        return super.getSupportActions().concat([]);
    }

    /*
        边框和阴影
    */

    @DECORATORS.serializable(true)
    @DECORATORS.field({
        type: Number.getType(),
        desc: '边框圆角',
        value: 0,
        unit: UDAttributeUnit.PX
    })
    borderRadius() {};
    // constructor({typeName,serializedString}) {
    constructor() {
        super();
    }
}
regClass(className, UDRectangle)

export default UDRectangle;