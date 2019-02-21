import Vue from 'vue'

const state = {
  currentSelect: null, //当前选择的对象
  currentSelectTool: null, //当前选择的工具箱
  scene:undefined //当前光标选择的区域
};

// getters
const getters = {
}

// actions
const actions = {
}

// mutations
const mutations = {

  /**
   * 选择对象item
   * @param {*} state 
   * @param {Object} payload 
   */
  selectItem (state,payload){
    console.log('store selectItem，payload=')
    console.log(payload)
    // state.stage = stage;
    Vue.set(state, "currentSelect", payload.item)
    Vue.set(state, "scene", payload.scene)
  },

  /**
   * 选择工具箱item
   * @param {*} state 
   * @param {Object} payload 
   */
  selectToolItem (state,payload){
    console.log('store selectToolItem，payload=')
    console.log(payload)
    // state.stage = stage;
    Vue.set(state, "currentSelectTool", payload.item)
    Vue.set(state, "scene", payload.scene)
  },
}

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations,
}
