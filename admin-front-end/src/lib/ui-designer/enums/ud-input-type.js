/*
    定义枚举：舞台运行的设备环境
*/


import {regEnums,regClass,createClassObject,Types} from "../ud-runtime"
/**
 * 内容剪切模式
 */
let UDInputType=regEnums('UDInputType',(iota)=>{
return {
        TEXT:1, 
        EMAIL:2, 
        TEL:3, 
        NUMBER:4, 
        PASSWORD:5, 
        DATE:6, 
        DATETIME:7, 
        SEARCH:8, 
    }
});


export default UDInputType
