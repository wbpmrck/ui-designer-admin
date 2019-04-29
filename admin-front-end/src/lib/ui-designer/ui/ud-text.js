import UDTextBase from './ud-text-base'
import UDTextAlignV from "../enums/ud-text-align-v"
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

const className = 'UDText'
/**
 * 表示展示文本
 */
@DECORATORS.serializable(true)
class UDText extends UDTextBase {

    static getTypeName() {
        return className
    }
    /**
     * 获取该类支持的事件类型。
     *
     * 定义了一个类型支持的事件，从而可以允许可视化编辑器辅助用户进行相关配置
     */
    static getSupportEvents() {
        return super
            .getSupportEvents()
            .concat([]);
    }

    /**
     * 获取该对象支持的行为
     */
    static getSupportActions() {
        return super
            .getSupportActions()
            .concat([]);
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
        type: UDTextAlignV.getType(),
        desc: '垂直对齐',
        value: UDTextAlignV.MIDDLE
    })
    alignV() {};

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
        type: String.getType(),
        desc: '文本内容',
        value: ""
    })
    txt() {};

    @DECORATORS.serializable(true)
    @DECORATORS.field({
        type: UDClipMode.getType(),
        desc: 'X轴剪切',
        value: UDClipMode.CLIP
    })
    clipX() {};

    @DECORATORS.serializable(true)
    @DECORATORS.field({
        type: UDClipMode.getType(),
        desc: 'Y轴剪切',
        value: UDClipMode.CLIP
    })
    clipY() {};

    // constructor({typeName,serializedString}) {
    constructor() {
        super();
    }
}
regClass(className, UDText)

export default UDText;