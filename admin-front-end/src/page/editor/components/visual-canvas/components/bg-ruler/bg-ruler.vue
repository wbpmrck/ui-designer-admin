<template>
    <div id="bg-ruler">
        <!-- 横向标尺 -->
        <div id="ruler-h" class="ruler" :style="{width:targetWidth+'px'}">
            <span class="mark"  :style="{width:scaleUnit+'px'}" v-for="(mark,index) in horizontalMarks" :class="{'big':index %10 ===0,'medium':index %5 ===0,'small':index % 10 !== 0 && index % 10 !== 5}"  :key="mark">
                <span class="label" v-if="index % 10 ===0">{{mark}}</span>
            </span>
        </div>
        <!-- 纵向标尺 -->
        <div id="ruler-v" class="ruler" :style="{width:targetHeight+'px'}">
            <span class="mark"  :style="{width:scaleUnit+'px'}" v-for="(mark,index) in verticalMarks" :class="{'big':index %10 ===0,'medium':index %5 ===0,'small':index % 10 !== 0 && index % 10 !== 5}"  :key="mark">
                <span class="label" v-if="index % 10 ===0">{{mark}}</span>
            </span>
        </div>
    </div>

    
</template>

<script>
export default {
    name: 'bg-ruler',
    props: {
        targetWidth:{
            type: Number,
            default: 720
        },
        targetHeight:{
            type: Number,
            default: 1080
        },
        //这代表一个刻度相当于多少px
        scaleUnit:{
            type: Number,
            default: 10
        },
    },
    data(){
        return {
        }
    },
    computed:{
        horizontalMarks(){
            //快速创建指定个数的数组，方便后面计算刻度。
            //这里使用join+spit是因为，Array创建的数组只有长度，内容是undefined,map的时候不会遍历
            let m =new Array(Math.ceil(this.targetWidth/this.scaleUnit)).join(0).split('');
            m = m.map((v,i)=>{
                return (i+1)*this.scaleUnit
            });
            m.unshift(0);
            return m;
        },
        verticalMarks(){
            let m =new Array(Math.ceil(this.targetHeight/this.scaleUnit)).join(0).split('');
            m = m.map((v,i)=>{
                return (i+1)*this.scaleUnit
            });
            m.unshift(0);
            return m;
        }
    },
    methods:{
    },
    created() {
    },

    components: {
    }

}
</script>

<style lang="scss" scoped>
    #bg-ruler {
        display: inline-block;
        width: 100%;
        height: 100%;
        // 尺子容器
        .ruler {
            position: absolute;
            background-color: #353535;
            border: none;
            top:0;
            left:0;
            display: inline-block;
            height:14px;
            box-sizing: border-box;
            max-width: 9999px;
            // 尺子里面的每个小刻度
            .mark{
                position: relative;
                display: inline-block;
                box-sizing: border-box;
                border-left: solid 1px #fff;
            }
            // 非整10刻度的单元
            .small{
                height:4px;
            }
            .medium{
                height:8px;
            }
            // 整10刻度单元
            .big{
                height:14px;
                // border-color: #1ffff2
                border-color: #1ff322
            }
            .label {
                position: absolute;
                color:#fff;
            }
        }
        // 横向标尺
        #ruler-h {
            position: absolute;
            top:-14px;
            left:0;
            // 整10刻度的标签位置
            .label {
                top:-10px;
                left:0;
            }
        }
        // 纵向标尺(先画横向的，然后旋转90度即可)
        #ruler-v {
            position: absolute;
            top:0px;
            left:0px;;
            transform-origin: top left;
            transform: rotateZ(90deg);
            // 整10刻度的标签位置
            .label {
                top:15px;
                left:0;
            }
        }

    }

</style>