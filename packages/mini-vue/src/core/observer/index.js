/**
 * 1. 实现响应式
 * 坑：
 * 1. set时，newVal可能也是一个对象
 * 2. 用户直接点一个对象中不存在的属性
 */
export function defineReactive (target, key, val) {
  observer(val)
  Object.defineProperty(target, key, {
    get () {
      console.log('getVal', val)
      return val
    },
    set (newVal) {
      if (newVal !== val) {
        // newVal也可能是一个对象
        observer(newVal)
        console.log('setVal', newVal)
        val = newVal
      }
    }
  })
}
// 给一个对象中所有的属性加上响应式
export function observer (target) {
  if (typeof target !== 'object' || target === null) {
    return
  }
  Object.keys(target).forEach(key => {
    defineReactive(target, key, target[key])
  })
  return new Observer(target)
}

export function set (target, key, val) {
  defineReactive(target, key, val)
  return val
}
// 每一个对象都要创建一个实例，暂不清楚原因，可能是跟收集依赖更新视图有关
export class Observer {
  constructor (value) {
    if (Array.isArray(value)) {

    } else {
      this.walk(value)
    }
  }

  walk (obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
}
