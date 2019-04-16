/*
    定义枚举：舞台运行的设备环境
*/


import {regEnums,regClass,createClassObject,Types} from "../ud-runtime"
/**
 * 触摸翻页的方式
 */
let UDTouchTurnPageEnum=regEnums('UDTouchTurnPageEnum',(iota)=>{
return {
        NONE:1, //不支持
        SWIPE_UP:2, //上滑翻页
        SWIPE_DOWN:3, //下滑翻页
        SWIPE_LEFT:4, //左滑翻页
        SWIPE_RIGHT:5, //右滑翻页
    }
});


export default UDTouchTurnPageEnum
