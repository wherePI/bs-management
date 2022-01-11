import Vue from 'vue'
import Router from 'vue-router'
import db from "../utils/localstorage";
import el from "element-ui/src/locale/lang/el";
import {progress} from '@/network/mock'
import ro from "element-ui/src/locale/lang/ro";
import Layout  from '@/View/meus/index'

Vue.use(Router)

const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const constRouter = [
    // 可以通过route.replace（{/redirect + path}） 处理不刷新页面情况下刷新数据
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path*',
                component: (resolve) => require(['@/View/redirect/index'], resolve)
            }
        ]
    },
    {
        path: '/login',
        name: '登录',
        component: (resolve) => require(['@/View/login/index'], resolve)
    },
    {
        path: '*',
        component: (resolve) => require(['@/View/error-page/404'], resolve),
        hidden: true
    },
    {
        path: '/',
        name: '首页',
        redirect: '/home',
        component: (resolve) => require(['@/View/meus/index'], resolve),
        children: [
            {
                path: '/home',
                name: '首页',
                component: (resolve) => require(['@/View/homePage/index'], resolve)
            }
        ]
    }
]
const router = new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constRouter
})
var WhiteList = ['/login']
let asyRoute
router.beforeEach((to, from, next) => {
  //  判断路由是否去往白名单
  if (WhiteList.indexOf(to.path) !== -1) {
      next()
  } else {
      // db.save('USER_ROUTER', '{name: "关于", path: "/"}, component: "/View/regard/index"')
      const token = db.get('TOKEN')
      const user = db.get('USER')
      const Route = db.get('USER_ROUTER')
    if (token.length) {
        if (!asyRoute) {
      if (Object.keys(Route).length === 0) {
          //   没有就动态添加路由
          progress('/route', {username: user.username}).then(res => {
              let asyncRouter = res.data
              db.save('USER_ROUTER', asyncRouter)
              asyRoute = asyncRouter
              go(to, next)
          })
      } else {
          asyRoute = Route
          go(to, next)
      }
        } else {
            next()
        }
    } else {
        next('/login')
    }
  }
})
var curreRoute
function addRoute(route) {
    route.forEach(t => {
       t.component = path(t.component)
        if (t.children) {
            t.children =  addRoute(t.children)
        }
        curreRoute = router.options.routes
        curreRoute[2].children.push(t)
    })
    router.addRoutes(curreRoute)
}

function go(to, next) {
    addRoute(asyRoute)
    // 路由在add后可能不会执行next 需要以下写法
    next({ ...to, replace: true })
}

// 动态请求路径
function path(path) {
   return (resolve) => require([`@/View${path}.vue`], resolve)
}

console.log(router)
export default router
