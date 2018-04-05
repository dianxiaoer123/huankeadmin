import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

Vue.use(Router)

/* layout */
import Layout from '../views/layout/Layout'

/**
* icon : the icon show in the sidebar
* hidden : if `hidden:true` will not show in the sidebar
* redirect : if `redirect:noredirect` will no redirct in the levelbar
* noDropdown : if `noDropdown:true` will has no submenu
* meta : { role: ['admin'] }  will control the page role
**/
export const constantRouterMap = [
    { path: '/login', component: _import('login/index'), hidden: true },
    { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
    { path: '/404', component: _import('errorPage/404'), hidden: true },
    { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{ path: 'dashboard', component: _import('dashboard/index') }]
  },
  {
    path: '/user/updatepwd',
    component: Layout,
    redirect: 'user/updatepwd',
    icon: 'people',
    noDropdown: true,
    hidden: true
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/device',
    component: Layout,
    name: '设备管理',
    meta: {
      title: '设备管理',
      icon: 'component'
    },
    children: [
      { path: 'deviceList', component: _import('extend/content/index'), name: '设备列表', meta: { title: '设备列表' }},
      { path: 'deviceType', component: _import('extend/content/index'), name: '设备类型管理', meta: { title: '设备类型管理' }}
    ]
  },
  {
    path: '/project',
    component: Layout,
    name: '工程管理',
    meta: {
      title: '工程管理',
      icon: 'component'
    },
    children: [
      { path: 'projectList', component: _import('extend/content/index'), name: '工程列表', meta: { title: '工程列表' }}
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
