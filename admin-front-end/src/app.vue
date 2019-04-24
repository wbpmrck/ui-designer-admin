<template>
  <div id="app">
    <editor/>
  </div>
</template>

<script>
  import editor from './page/editor/editor';
  import { UDStage, UDUIContainer, UDRectangle } from './lib/ui-designer/index.js';

  export default {
    name: 'app',
    components: {
      editor
    },
    created() {
      //TODO:先创建一个空的舞台对象进去，做测试使用
      var rootStage = new UDStage();
      rootStage.name({ value: '舞台' });
      rootStage.sw({ value: 750 });
      rootStage.sh({ value: 1334 });

      // rootStage.eventHandlers({
      //   value:[
      //     "event1",
      //     "event2",
      //   ]
      // })

      // //一个容器
      // let div1 = new UDUIContainer();
      // div1.x({value:20});
      // div1.y({value:30});
      // div1.name({value:'区域1 区域1 区域1 区域1 区域1 区域1 区域1 区域1 区域1 区域1 '});

      // // 一个矩形
      // let rect1 = new UDRectangle();
      // rect1.x({value:20});
      // rect1.y({value:30});
      // rect1.alpha({value:11.5});
      // rect1.name({value:'rect11 rect11 rect11 rect11 rect11 rect11 rect11 rect11 rect11 rect11 rect11 '})

      // // 2个矩形
      // let rect2 = new UDRectangle();
      // rect2.x({value:20});
      // rect2.y({value:30});
      // rect2.name({value:'rect22 rect22 rect22 rect22 rect22 rect22 rect22 rect22 rect22 rect22 rect22 rect22 '})

      // // 矩形放在容器里
      // div1.addChild(rect1);
      // div1.addChild(rect2);

      // //一个容器
      // let div2 = new UDUIContainer();
      // div2.x({value:20});
      // div2.y({value:30});
      // div2.name({value:'区域2 区域2 区域2 区域2 区域2 区域2 区域2 区域2 区域2 区域2 区域2 区域2 区域2 区域2 '});

      // // 3个矩形
      // let rect3 = new UDRectangle();
      // rect3.x({value:20});
      // rect3.y({value:30});
      // rect3.name({value:'rect3 rect3 rect3 rect3 rect3 rect3 rect3 rect3 rect3 rect3 rect3'})
      // rect3.eventHandlers({
      //   value:[
      //     "event31",
      //     "event32",
      //   ]
      // })
      // // 矩形放在容器里
      // div2.addChild(rect3);

      // // 容器放到舞台里
      // rootStage.addChild(div1);
      // rootStage.addChild(div2);

      console.log('tree commit');
      console.log(rootStage);
      this.$store.commit('setStage', rootStage);

      console.log(rootStage.children() && rootStage.children().value && rootStage.children().value.length > 0);
    }
  };
</script>

<style>
  body {
    background-color: #000;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
</style>
