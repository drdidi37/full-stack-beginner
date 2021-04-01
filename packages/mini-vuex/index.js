
let Vue

class Store {
  constructor (options) {
    this.$options = options

    this._vm = new Vue({
      data () {
        return {
          $$store: options.state
        }
      }
    })
  }

  get state () {
    return this._vm._data.$$store
  }

  commit (type, payload) {
    const mutations = this.$options.mutations[type]
    if (!mutations) {
      throw new Error(`Unknown mutation ${type}`)
    }
    mutations(this.state, payload)
  }

  dispatch (type, payload) {}
}

function install (_Vue) {
  Vue = _Vue
  Vue.mixin({
    beforeCreate () {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

export default {
  Store,
  install
}
