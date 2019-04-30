/*
    行容器在水平方向的布局方式
*/


import {
    regEnums,
    regClass,
    createClassObject,
    Types
} from "../ud-runtime"
/**
 * 行容器在水平方向的布局方式
 */
let UDRowAlignH = regEnums('UDRowAlignH', (iota) => {
    return {
        LEFT: 1,
        CENTER: 2,
        RIGHT: 3,
        SPACE_BETWEEN: 4,
    }
});


export default UDRowAlignH