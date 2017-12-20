import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import {
  Message
} from 'element-ui'
import {
  getToken
} from '@/utils/auth' // 验权

function hasPermission(url, permissionUrls, permissionRoles) {
  if (permissionRoles[0] === 1 || permissionRoles[0] === 2) {
    return true
  }
  if (url.path === '/401') return true;
  if (url.path === '/404') {
    return true
  }
  if (!url.meta.url) {
    return true
  }
  return permissionUrls.indexOf(url.meta.url[0]) >= 0;
}

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  // console.log('to.path', to.path)
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({
        path: '/'
      })
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          const roles = res.data.role;
          const routers = res.data.routers;
          store.dispatch('GenerateRoutes', {
            roles,
            routers
          }).then(() => {
            router.addRoutes(store.getters.addRouters);
            next({
              ...to,
              replace: true
            });
          });
          // next()
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            Message.error('验证失败,请重新登录')
            next({
              path: '/login'
            })
          })
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(to, store.getters.urls, store.getters.roles)) {
          next() //
        } else {
          console.info(to.path)
          next({
            path: '/',
            query: {
              noGoBack: true
            }
          })
          NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
        }
        // 可删 ↑
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
