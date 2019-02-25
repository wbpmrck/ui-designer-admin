import Vue from 'vue'

const state = {
  toolBox:{
    isExpand:true, //默认工具箱面板展开
  }
}

// getters
const getters = {
}

// actions
const actions = {
}

// mutations
const mutations = {

  /**
   * 初始化整个舞台
   * @param {*} state 
   * @param {Object} stage 
   */
  setToolBoxState (state,{name,value}){
    console.log('store setToolBoxState')
    Vue.set(state.toolBox, name, value)
  },

}

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
}
