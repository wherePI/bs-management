import Vue from 'vue'
import db from '@/utils/localstorage.js'
Vue.directive('hasPermission', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el,bind) {
        var user = db.get('USER')
        let flag = true
        const value = bind.value
        if (user.hasp) {
            var arr = user.hasp
            for (var v of value) {
                if (!arr.includes(v)) {
                    flag = false
                }
            }
        } else {
            el.parentNode.removeChild(el)
        }
        if (!flag) {
            // 如果没有父级就隐藏该DOM元素
            if (!el.parentNode) {
                el.style.display = 'none'
            } else {
                // 如果有就让父级元素删除自己
                el.parentNode.removeChild(el)
            }
        }
    }
})
