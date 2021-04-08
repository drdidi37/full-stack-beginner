import { observer } from './src/core/observer'

function proxy (vm) {
  Object.keys(vm.$data).forEach(key => {
    Object.defineProperty(vm, key, {
      get () {
        return vm.$data[key]
      },
      set (val) {
        vm.$data[key] = val
      }
    })
  })
}

class MiniVue {
  constructor (options) {
    this.$options = options
    this.$el = document.querySelector(options.el)
    this.$data = options.data
    observer(this.$data)
    proxy(this)
  }
}

export default MiniVue
