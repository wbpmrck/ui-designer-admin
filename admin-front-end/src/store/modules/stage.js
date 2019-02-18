import Vue from 'vue'

const state = {
  stage: null
}

// getters
const getters = {
  item: (state) => (id) => {
    return findObject(state.stage,id)
  }
}

// actions
const actions = {
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

  setStage (state,stage){
    console.log('store setStage')
    // state.stage = stage;
    Vue.set(state, "stage", stage)
  },
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
  }
}

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
}
