import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '主页', icon: 'el-icon-s-home' }
    }]
  },

  {
    path: '/map',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Map',
      component: () => import('@/views/map/index'),
      meta: { title: '灾情地图', icon: 'el-icon-map-location' }
    }]
  },

  {
    path: '/diagram',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Diagram',
      component: () => import('@/views/diagram/index'),
      meta: { title: '灾情图表', icon: 'el-icon-pie-chart' }
    }]
  },

  {
    path: '/search',
    component: Layout,
    redirect: '/search/earthquake',
    name: 'Search',
    meta: { title: '灾情查询', icon: 'el-icon-s-data' },
    children: [
      {
      path: 'earthquake',
      name: 'EarthquakeSearch',
      component: () => import('@/views/search/earthquake/index'),
      meta: { title: '基本震情查询', icon: 'el-icon-search' }
      },
      {
        path: 'second',
        name: 'SecondSearch',
        component: () => import('@/views/search/second/index'),
        meta: { title: '次生灾害查询', icon: 'el-icon-search' }
      },
      {
        path: 'house',
        name: 'HouseSearch',
        component: () => import('@/views/search/house/index'),
        meta: { title: '房屋破坏查询', icon: 'el-icon-search' }
      },
      {
        path: 'people',
        name: 'PeopleSearch',
        component: () => import('@/views/search/people/index'),
        meta: { title: '人员伤亡查询', icon: 'el-icon-search' }
      }
    ]
  },

  {
    path: '/document',
    component: Layout,
    redirect: '/document/api_doc',
    name: 'Document',
    meta: { title: '文档说明', icon: 'el-icon-document-copy' },
    children: [
      {
        path: 'api_doc',
        name: 'ApiDoc',
        component: () => import('@/views/document/api_doc/index'),
        meta: { title: 'API文档', icon: 'el-icon-document' }
      },
      {
        path: 'encode_doc',
        name: 'EncodeDoc',
        component: () => import('@/views/document/encode_doc/index'),
        meta: { title: '编码文档', icon: 'el-icon-document' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
