
let Vue

class Store {
  constructor (options) {
    /**
     * three events in minimal-Vuex's constructor core
     * 1. save store internal state
     * 2. bind commit and dispatch to self
     * 3. initialize the store vm, which is responsible for the reactivity
     */
    this.$options = options
    this._mutations = options.mutations
    this._actions = options.actions
    this._wrappedGetters = options.getters
    const store = this

    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)

    resetStoreVM(store, options.state)
  }

  get state () {
    return this._vm._data.$$store
  }

  // get getters () {
  //   return Object.keys(this._wrappedGetters).reduce((result, key) => {
  //     Object.defineProperty(result, key, {
  //       get: () => this._vm[key]
  //     })
  //     return result
  //   }, {})
  // }

  // set getters () {
  //   console.error('the attribute getters is readonly')
  // }
  commit (type, payload) {
    const mutations = this._mutations[type]
    if (!mutations) {
      throw new Error(`Unknown mutation ${type}`)
    }
    mutations(this.state, payload)
  }

  dispatch (type, payload) {
    const actions = this._actions[type]
    if (!actions) {
      throw new Error(`Unknown mutation ${type}`)
    }
    actions(this, payload)
  }
}

function resetStoreVM (store, state) {
  store.getters = {}
  const computed = {}
  Object.keys(store._wrappedGetters).forEach(key => {
    computed[key] = function () {
      return store._wrappedGetters[key](store.state)
    }
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key]
    })
  })

  store._vm = new Vue({
    data () {
      return {
        $$store: state
      }
    },
    computed
  })
  // store._vm = new Vue({
  //   data () {
  //     return {
  //       $$store: state
  //     }
  //   },
  //   computed: Object.keys(store._wrappedGetters).reduce((result, key) => {
  //     result[key] = function () {
  //       return store._wrappedGetters[key](store.state)
  //     }
  //     return result
  //   }, {})
  // })
}

function install (_Vue) {
  Vue = _Vue
  Vue.mixin({
    beforeCreate () {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
        window.$store = this.$options.store
      }
    }
  })
}

export default {
  Store,
  install
}
