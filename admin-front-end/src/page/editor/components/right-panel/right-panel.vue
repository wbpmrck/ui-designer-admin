<template>


      <pannel id="right-panel">
        <div class="drag-left"></div>
        <div class="tab-bar">
            <div class="nav-btn" v-for="tab in tabs" :key="tab.name" @click="selectTab(tab)" :class="{ active: currentTab.name === tab.name }">
                <div class="nav-title">{{tab.name}}</div>
                <div class="border-bottom-line"></div>
            </div>
          
        </div>
        <component v-if="currentTab!==undefined" v-bind:is="currentTab.component"></component>


        <effect-event-bar></effect-event-bar>
        <div class="bottom-bar"></div>
      </pannel>
    
</template>

<script>
import pannel from '../../../../components/pannel/pannel'
import objectTree from './components/object-tree/object-tree'
import assetTree from './components/asset-tree/asset-tree'
import effectEventBar from './components/effect-event-bar/effect-event-bar'
export default {
  name: 'right-panel',
  data(){
      return {
          tabs:[
              {name:'对象树',component:'objectTree'},
              {name:'素材',component:'assetTree'},
          ],
          currentTab:undefined
      }
  },
  methods:{
      selectTab(tab){
          this.currentTab = tab;
      }
  },
  created() {
      this.currentTab = this.tabs[0];
  },

  components: {
    assetTree,
    objectTree,
    effectEventBar,
    pannel,
  }
    
}
</script>

<style lang="scss" scoped>
    #right-panel {
        position: fixed;
        right: 0;
        top: 37px;
        bottom: 0px;
        width: 280px;
        min-width: 280px;
        z-index: 50;

        // border: solid 2px red;

        .drag-left {
            position: absolute;
            left: -5px;
            top: 0;
            bottom: 0;
            width: 10px;
            opacity: 0;
            z-index: 99;
            cursor: w-resize;
        }

        .tab-bar {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 30px;
            background: #303030;
            z-index: 2;
            border-bottom: 1px solid #151515;

            display: flex;
            align-items: stretch;

            .nav-btn {
                text-align: center;
                font-size: 12px;
                cursor: pointer;
                padding: 5px 11px;
                position: relative;
                display: flex;
                justify-content: center;

                    .nav-title {
                        max-width: 100px;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        line-height:18px;
                    }
                    .border-bottom-line {
                        position: absolute;
                        left: 0;
                        bottom: -1px;
                        width: 100%;
                        height: 1px;
                        background: #232323;
                    }
            }
            .nav-btn.active {
                background: #232323;
            }
        }


        .bottom-bar {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 30px;
            background: #313131;
            padding-right: 6px;
        }
    }

</style>
