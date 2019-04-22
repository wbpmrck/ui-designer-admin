/*
    定义枚举：舞台运行的设备环境
*/


import {
    regEnums,
    regClass,
    createClassObject,
    Types
} from "../ud-runtime"
/**
 * 内容剪切模式
 */
let UDClipMode = regEnums('UDClipMode', (iota) => {
    return {
        CLIP: 1, // 如果需要，内容将被剪裁以适合填充框。 不提供滚动条。
        // VISIBLE:2, // 内容不会被修剪，可以呈现在元素框之外。
        SCROLL: 3, // 如果需要，内容将在某个方向产生滚动条
    }
});


export default UDClipMode