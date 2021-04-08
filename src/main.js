import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MiniVue from '../packages/mini-vue/index'

// eslint-disable-next-line no-unused-vars
const miniApp = new MiniVue({
  el: '#app',
  data: {
    counter: 1
  }
})
setInterval(() => {
  miniApp.counter++
}, 1000)

Vue.config.productionTip = false

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
window.$$vm = app
