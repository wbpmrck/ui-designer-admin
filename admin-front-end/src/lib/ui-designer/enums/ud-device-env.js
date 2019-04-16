/*
    定义枚举：舞台运行的设备环境
*/


import {regEnums,regClass,createClassObject,Types} from "../ud-runtime"
/**
 * 设备环境
 */
let UDDeviceEnv=regEnums('UDDeviceEnv',(iota)=>{
return {
        ANY:1, //表示舞台可以运行在任何设备平台
        PC:2, //家用电脑
        MOBILE:3, //手机
        TABLET:4, //平板
    }
});


export default UDDeviceEnv
