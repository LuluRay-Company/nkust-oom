import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  // 添加全局路由管理
  Router.beforeEach((to, from, next) => {
    // 檢查路由是否需要認證
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // 檢查用戶是否已登入
      const userAccount = localStorage.getItem('userAccount')
      if (!userAccount) {
        // 未登入，重定向到登入頁面
        next({
          path: '/login',
          query: { redirect: to.fullPath }  // 保存原本要去的路徑
        })
      } else {
        // 已登入，允許訪問
        next()
      }
    } else {
      // 不需要認證的路由，直接放行
      next()
    }
  })

  return Router
})
