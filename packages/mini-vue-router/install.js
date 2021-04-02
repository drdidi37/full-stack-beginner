import routerLink from './components/routerLink'
import routerView from './components/routerView'

export let Vue

export function install (_Vue) {
  Vue = _Vue
  Vue.mixin({
    beforeCreate () {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })
  Vue.component(routerLink.name, routerLink)
  Vue.component(routerView.name, routerView)
}
