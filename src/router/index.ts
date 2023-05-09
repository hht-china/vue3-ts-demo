import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    //重定向，或者说默认值，因为HomeView是页面布局没有内容，我们需要设置默认的页面
    redirect: 'model',
    children: [
      {
        path: 'model',
        name: 'ModelView',
        meta: {
          isShow: true,  // 是否需要被展示出来
          title: "实体列表"
        },
        component: () => import('@/views/model/ModelListView.vue')
      }, {
        path: 'comment',
        name: 'CommentView',
        meta: {
          isShow: true,  // 是否需要被展示出来
          title: "注意事项"
        },
        component: () => import('@/views/other/CommentView.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token: string | null = localStorage.getItem("token")
  if(!token && to.path !== "/login"){
    next("/login")
  }
  else{
    next()
  }
})

export default router
