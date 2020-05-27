import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'



Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: 'index'
    },
    {
      path: '/index',
      name: 'index',
      component: resolve => import('@/pages/index')
    },
    {
      path: '/class',
      name: 'class',
      component: resolve => import('@/pages/class')
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => import('@/pages/login'),
      beforeEnter(to, from, next) {
        let user = store.state.user.isLogin
        next()
        if (user) {
          next('/index')
        }
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/pages/register')
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('@/pages/detail')
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('@/pages/shop')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/pages/search')
    },
    {
      path: '/myorder',
      name: 'myorder',
      component: () => import('@/pages/myorder')
    },
  ]
})

// router.beforeEach((to, from, next) => {
//   let isLogin = store.state.user.isLogin
//   next()
//   if (isLogin) {
//     next()
//   } else {
//     router.push("/login")
//   }
// })
export default router