import UDClipMode from "../enums/ud-clip-mode"
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
import UDInput from './ud-input';

const className = 'UDMultiInput'
/**
 * 多行文本输入框
 */
@DECORATORS.serializable(true)
class UDMultiInput extends UDInput {

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
        type: Number.getType(),
        desc: '行距',
        value: 0,
        unit: UDAttributeUnit.PX
    })
    ls() {};
    @DECORATORS.serializable(true)
    @DECORATORS.field({
        type: Boolean.getType(),
        desc: '禁用回车',
        value: false
    })
    forbidEnter() {};

    // constructor({typeName,serializedString}) {
    constructor() {
        super();
    }
}
regClass(className, UDMultiInput)

export default UDMultiInput;