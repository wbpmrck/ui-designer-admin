/*
    行容器在垂直方向的布局方式
*/


import {
    regEnums,
    regClass,
    createClassObject,
    Types
} from "../ud-runtime"
/**
 * 行容器在垂直方向的布局方式
 */
let UDRowAlignV = regEnums('UDRowAlignV', (iota) => {
    return {
        TOP: 1,
        MIDDLE: 2,
        BOTTOM: 3,
    }
});


export default UDRowAlignV