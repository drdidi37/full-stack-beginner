import { install, Vue } from './install'

class VueRouter {
  constructor (options) {
    this.$options = options
    this._routes = options.routes

    Vue.util.defineReactive(this, 'current', window.location.hash.slice(1) || '/')
    window.addEventListener('hashchange', () => {
      this.current = window.location.hash.slice(1)
    })
  }
}

VueRouter.install = install

export default VueRouter
