const routerLink = {
  name: 'RouterLink',
  props: {
    to: String
  },
  render (h) {
    const data = {
      attrs: {
        href: `#${this.to}`
      }
    }
    return h('a', data, this.$slots.default)
  }
}

export default routerLink
