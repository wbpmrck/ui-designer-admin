/*
    定义枚举：舞台运行的设备环境
*/


import {regEnums,regClass,createClassObject,Types} from "../ud-runtime"
/**
 * 文本垂直对齐方式
 */
let UDTextAlignV=regEnums('UDTextAlignV',(iota)=>{
return {
        TOP:1, 
        MIDDLE:2, 
        BOTTOM:3, 
    }
});


export default UDTextAlignV
