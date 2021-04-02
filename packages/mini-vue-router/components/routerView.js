const routerView = {
  name: 'RouterView',
  props: {},
  render (h) {
    const data = {}

    const {
      current,
      _routes
    } = this.$router
    const component = _routes.find(route => {
      return route.path === current
    })?.component
    return h('div', data, [h(component)])
    // return h(component)
  }
}

export default routerView
