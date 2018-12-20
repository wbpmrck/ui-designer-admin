import Vue from 'vue'
import Vuex from 'vuex'
import selection from './modules/selection'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    selection,
  },
  strict: debug, //在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。
  // plugins: debug ? [createLogger()] : []
})
