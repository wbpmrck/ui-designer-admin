/*
    定义枚举：舞台运行的设备环境
*/


import {regEnums,regClass,createClassObject,Types} from "../ud-runtime"
/**
 * 文本水平对齐方式
 */
let UDTextAlignH=regEnums('UDTextAlignH',(iota)=>{
return {
        LEFT:1,
        CENTER:2, 
        RIGHT:3, 
    }
});


export default UDTextAlignH
