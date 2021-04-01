import Vue from 'vue'
import Vuex from '@packages/mini-vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    add (state, payload = 1) {
      state.counter += payload
    }
  },
  actions: {
  },
  modules: {
  }
})
