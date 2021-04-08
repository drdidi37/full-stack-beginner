
export class Compiler {
  constructor (el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)
    this.$el && this.compile(this.$el)
  }

  compile (el) {
    // 使用node.type判断是节点还是插值文本
    el.childNodes.forEach(node => {
      if (node.childNodes.length > 0) {
        // 递归编译
        this.compile(node)
      }
    })
  }
}
