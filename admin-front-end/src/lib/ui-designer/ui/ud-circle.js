import {
    UDAttributeUnit
} from "../enums/ud-unit"
import {
    regEnums,
    regClass,
    createClassObject,
    Types,
    DECORATORS,
    field,
    UDAttribute
} from "../ud-runtime"
import UDUITwoDim from './ud-ui-two-dim';

const className = 'UDCircle'
/**
 * 一个圆形
 */
@DECORATORS.serializable(true)
class UDCircle extends UDUITwoDim {

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

    @DECORATORS.serializable(true)
    @DECORATORS.field({
        type: String.getType(),
        desc: '颜色',
        value: '#000'
    })
    color() {};

    // constructor({typeName,serializedString}) {
    constructor() {
        super();
    }
}
regClass(className, UDCircle)

export default UDCircle;