import UDTextAlignH from "../enums/ud-text-align-h"
import UDTextAlignV from "../enums/ud-text-align-v"
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

const className = 'UDTextBase'
/**
 * 表示可以处理文本展示类的控件，这是一个虚基类，不应该直接基于本类创建实例。
 */
@DECORATORS.serializable(true)
class UDTextBase extends UDUITwoDim {

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
        desc: '字体家族',
        value: 'Microsoft YaHei'
    })
    font() {};

    @DECORATORS.serializable(true)
    @DECORATORS.field({
        type: Number.getType(),
        desc: '字号',
        value: 12,
        unit: UDAttributeUnit.PX
    })
    fs() {};

    @DECORATORS.serializable(true)
    @DECORATORS.field({
        type: String.getType(),
        desc: '字色',
        value: '#000'
    })
    fontColor() {};

    @DECORATORS.serializable(true)
    @DECORATORS.field({
        type: UDTextAlignH.getType(),
        desc: '水平对齐',
        value: UDTextAlignH.CENTER
    })
    alignH() {};

    @DECORATORS.serializable(true)
    @DECORATORS.field({
        type: UDTextAlignV.getType(),
        desc: '垂直对齐',
        value: UDTextAlignV.TOP
    })
    alignV() {};

    @DECORATORS.serializable(true)
    @DECORATORS.field({
        type: Boolean.getType(),
        desc: '是否加粗',
        value: false
    })
    bold() {};

    @DECORATORS.serializable(true)
    @DECORATORS.field({
        type: Boolean.getType(),
        desc: '是否斜体',
        value: false
    })
    italic() {};

    @DECORATORS.serializable(true)
    @DECORATORS.field({
        type: Boolean.getType(),
        desc: '下划线',
        value: false
    })
    underline() {};

    @DECORATORS.serializable(true)
    @DECORATORS.field({
        type: Number.getType(),
        desc: '行距',
        value: 0,
        unit: UDAttributeUnit.PX
    })
    ls() {};


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
regClass(className, UDTextBase)

export default UDTextBase;