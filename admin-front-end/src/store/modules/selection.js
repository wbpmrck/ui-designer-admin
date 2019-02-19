import Vue from 'vue'

const state = {
  currentSelect: null,
  scene:undefined
};

// getters
const getters = {
}

// actions
const actions = {
}

// mutations
const mutations = {

  selectItem (state,payload){
    console.log('store selectItem，payload=')
    console.log(payload)
    // state.stage = stage;
    Vue.set(state, "currentSelect", payload.item)
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
