/*
    列容器在水平方向的布局方式
*/


import {
    regEnums,
    regClass,
    createClassObject,
    Types
} from "../ud-runtime"
/**
 * 列容器在水平方向的布局方式
 */
let UDColAlignH = regEnums('UDColAlignH', (iota) => {
    return {
        LEFT: 1,
        CENTER: 2,
        RIGHT: 3,
    }
});


export default UDColAlignH