// import {UDAttribute,createAttribute,createAttributeWithName} from "./ud-attribute"
import {
    regEnums,
    regClass,
    createClassObject,
    Types,
    Type,
    DECORATORS,
    field,
    UDAttribute
} from "./ud-runtime"
import UDEvent from "./ud-event"
import UDAction from "./ud-action"
import UDTouch from "./gesture/ud-touch"
import UDEventHandler from "./ud-event-handler"


@DECORATORS.serializable(true)
class UDObject {
    /**
     * 子类必须实现这个方法，从而支持将类型信息序列化和反序列化
     */
    static getTypeName() {
        return 'UDObject'
    }
    static identitySeed = 1;

    /**
     * 获取该类支持的事件类型。
     * 
     * 定义了一个类型支持的事件，从而可以允许可视化编辑器辅助用户进行相关配置
     */
    static getSupportEvents() {
        return [
            new UDEvent({
                name: 'deleted',
                desc: '被删除',
                contextParams: []
            })
        ];
    }

    /**
     * 获取该对象支持的行为
     */
    static getSupportActions() {
        return [
            new UDAction({
                name: 'setAttr',
                desc: '设置属性',
                params: [
                    new UDAttribute({
                        name: 'attributesArray',
                        desc: '要设置的属性列表',
                        valueType: Types.ARRAY(UDAttribute.getType())
                    })
                ]
            }),
            new UDAction({
                name: 'delete',
                desc: '删除对象',
                params: []
            })
        ];
    }


    @DECORATORS.serializable(true)
    @DECORATORS.field({
        type: String.getType(),
        desc: '自动化生成的唯一标识',
        value: ''
    })
    // _id; //自动化生成的唯一标识
    _id() {}; //自动化生成的唯一标识


    @DECORATORS.serializable(true)
    @DECORATORS.field({
        type: String.getType(),
        desc: '允许外部指定的名称',
        value: ''
    })
    name() {}; //允许外部指定的唯一标识


    @DECORATORS.serializable(true)
    @DECORATORS.field({
        type: Types.ARRAY(UDEventHandler.getType()),
        desc: '对象上挂载的事件处理逻辑',
        value: []
    })
    eventHandlers() {}; //允许外部指定的唯一标识


    parent; //节点的父亲节点




    // constructor({serializedString}) {
    constructor() {
        // // 如果不是通过反序列化创建对象，则开始正常构造对象
        // if(serializedString!==undefined && serializedString!==null && serializedString.length>0){
        //     this.deserialize(serializedString)
        // }else{
        // this.typeName = typeName;
        this._id({
            value: `${+new Date()}-${UDObject.identitySeed++}`
        });
        this.parent = undefined;
        this.initAllProps();
        // }
    }

    initAllProps() {
        for (var p in this) {
            if (this[p] && this[p].__ud_attribute__) {
                console.log(`init prop:${p}`)
                this[p]();
            }
        }
    }

    /**
     * 将自身的所有属性enable开启，但是传入的数组里的属性名全部关闭
     * @param {Array<String>} propNamesArray 
     */
    enableAllPropsExcept(propNamesArray) {
        propNamesArray = propNamesArray || [];
        for (var p in this) {
            //如果自己有属性
            if (this[p] && this[p].__ud_attribute__) {
                if (propNamesArray.indexOf(p) > -1) {
                    console.log(`disable prop:[${p}]`)
                    this[p]().setEnable(false);
                    // this[p]().enable = false;
                } else {
                    this[p]().setEnable(true);
                    // this[p]().enable = true;
                }
            }
        }
    }


    /**
     * 判断该对象能否添加目标类型的实例为自己的孩子
     * @param {TypeName} targetType 
     */
    canAddChild(targetType) {
        return false;
    }

    /**
     * 如果该对象有子元素，那么子元素的哪些属性需要被禁用
     */
    getDisableChildrenProps() {
        return [];
    }

    /**
     * 获取对象的兄弟节点
     * @param {Number} n :自己身后的第n个兄弟。默认是1
     */
    sibling(n) {
        n = n === undefined ? 1 : n;
        if (this.parent && this.parent.children().value.length > 1) {
            //选择当前元素的下一个兄弟，或者是他父亲
            let selfIndex = this.parent.indexOfChild(this);
            let siblingIndex = (selfIndex + n) % this.parent.children().value.length;
            let nextSlibling = this.parent.children().value.length > siblingIndex ? this.parent.children().value[siblingIndex] : undefined;
            return nextSlibling;
        } else {
            return undefined;
        }
    }

    /**
     * 从应用中删除自身
     */
    delete() {
        if (this.parent) {
            return this.parent.removeChild(this);
        } else {
            return false;
        }
    }
}
regClass("UDObject", UDObject)
export default UDObject