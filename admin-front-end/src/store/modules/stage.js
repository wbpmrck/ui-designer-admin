import Vue from 'vue'

const state = {
  stage: null
}

// getters
const getters = {
  item: (state) => (id) => {
    return findObject(state.stage,id)
  },
  stage(state){
    return state.stage;
  }
}

// actions
const actions = {
  addObjectAndSelectIt ({ state, commit,dispatch, rootState },{object,parent,scene}) {
    // 先提交添加孩子的mutation  
    commit('addObject',{object,parent})
    // 再提交选择对象的mutation
    commit('selectItem',{item:object,scene})
  }
}

function findObject(parent,id){
  let found = undefined;

  if(parent){
    if(parent._id().value === id){
      return parent;
    }else if(parent.children &&  parent.children().value && parent.children().value.length>0){

      for(var i =0;i<parent.children().value.length;i++){
        found = findObject(parent.children().value[i],id)
        if(found){
          break;
        }
      }

    }
  }
  return found;
}
// mutations
const mutations = {

  /**
   * 初始化整个舞台
   * @param {*} state 
   * @param {Object} stage 
   */
  setStage (state,stage){
    console.log('store setStage')
    // state.stage = stage;
    Vue.set(state, "stage", stage)
  },

  /**
   * 修改某个对象
   * @param {*} state 
   * @param {Object} param1 
   */
  updateObject (state,{id,propName,propValue}) {
    console.log('store updateObject')
    // console.log('id=')
    // console.log(id)
    // console.log('propName=')
    // console.log(propName)
    // console.log('propValue=')
    // console.log(propValue)

    let obj = findObject(state.stage,id);
    Vue.set(obj, propName, propValue)
  },
  addObject (state,{parent,object}){
    console.log('store addObject')
    parent.addChild && parent.addChild(object)
  },
}

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
}
