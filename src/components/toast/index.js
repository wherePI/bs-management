const obj = {}

import toast from './Toast'

obj.install = function (Vue) {
  // 注册构造函数
  var golabl = Vue.extend(toast)
  // 注册全局组件
  var toastDome = new golabl()
  // 组件挂在到新创建的div上
  toastDome.$mount(document.createElement('div'))
  // div挂在body上
  document.body.appendChild(toastDome.$el)
  // 原型添加该组件
  Vue.prototype.$toast = toastDome
}

export default obj
