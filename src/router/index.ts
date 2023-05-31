import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',  
    name: 'home',
    component: () => import('../views/index.vue'),
    redirect: 'goods',
    children: [
      {
        path: 'goods',
        name: 'goods',
        meta: {
          isShow: true,
          title: '商品列表',
        },
        component: () => import('../views/goodsViews.vue')
      },
      {
        path: 'user',
        name: 'user',
        meta: {
          isShow: true,
          title: '用户列表',
        },
        component: () => import('../views/userViews.vue')
      },
      {
        path: 'role',
        name: 'role',
        meta: {
          isShow: true,
          title: '角色列表',
        },
        component: () => import('../views/roleViews.vue')
      },
      {
        path: 'authority',
        name: 'authority',
        meta: {
          isShow: false,
          title: '权限列表',
        },
        component: () => import('../views/authorityView.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  if(!token && to.path !== '/login') {
    next('login')
  }else {
    next()
  }
})

export default router
