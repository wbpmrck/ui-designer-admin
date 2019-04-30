/*
    列容器在垂直方向的布局方式
*/


import {
    regEnums,
    regClass,
    createClassObject,
    Types
} from "../ud-runtime"
/**
 * 列容器在垂直方向的布局方式
 */
let UDColAlignV = regEnums('UDColAlignV', (iota) => {
    return {
        TOP: 1,
        MIDDLE: 2,
        BOTTOM: 3,
        SPACE_BETWEEN: 4,
    }
});


export default UDColAlignV