import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './route/route'
import '@/utils/permissionDirect.js'
import toast from "@/components/toast/index.js"


Vue.use(ElementUI)
Vue.use(toast)

Vue.config.productionTip = false
// this.$toast.show('退出登录', 3000)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
