// 路由-相关模块
import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import Search from '@/views/Search'
import Play from '@/views/Play'
import Comment from '@/views/Comment'
import Recommend from '@/views/Recommend'
import Login from '@/views/Login'
import SupplierAllBack from '@/views/SupplierAllBack'

import store from '@/vuex/store'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/login',
  },

  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/layout',
    name: 'Layout',
    component: Layout,
    redirect: '/layout/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
        meta: {
          // meta保存路由对象额外信息的
          title: '首页',
          keepAlive: true, // 需要缓存
        },
      },
      {
        path: 'search',
        name: 'Search',
        component: Search,
        meta: {
          title: '搜索',
          keepAlive: false, // 不需要缓存
        },
      },
    ],
  },
  {
    path: '/play',
    name: 'Play',
    component: Play,
    keepAlive: false, // 不需要缓存
  },
  {
    path: '/comment',
    name: 'Comment',
    component: Comment,
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: Recommend,
  },
  {
    path: '/supplier/supplierAll/supplierAllBack',
    name: 'SupplierAllBack',
    component: SupplierAllBack,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((to, from, next) => {
  let user = sessionStorage.getItem('userInfo') //获取点击登录按钮时所设置的 sessionStorage
  if (
    to.path === '/layout/home' ||
    to.path === '/layout/search' ||
    to.path === '/play' ||
    to.path === '/comment' ||
    to.path === '/recommend'
  ) {
    //如果想要跳转home或者algsmanager页面必须判断有没有sessionStorage
    if (user != null) {
      //如果有sessionStorage
      store.commit('setUser', user)
      next() //跳转
    } else {
      alert('您还没有登录，请先登录账户') //没有就先登录
      next('/login') //还在登录页
    }
  } else {
    next()
  }
  if (to.path === '/login') {
    //如果跳转到了登录页面必须清空sessionStorage，否则在地址栏输入路径还是会跳转
    sessionStorage.clear() //清空sessionStorage
  }
})

export default router
