import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
  title: 'title'               the name show in submenu and breadcrumb (recommend set)
  icon: 'svg-name'             the icon show in the sidebar,
}
**/
export const constantRouterMap = [{
  path: '/login',
  component: _import('login/index'),
  hidden: true
},
{
  path: '/404',
  component: _import('404'),
  hidden: true
},
{
  path: '/401',
  component: _import('401'),
  hidden: true
},
{
  path: '',
  component: Layout,
  redirect: '/dashboard',
  name: 'Dashboard',
  hidden: false,
  children: [{
    path: 'dashboard',
    meta: {
      title: '主页',
      icon: 'dashboard'
    },
    component: _import('dashboard/index')
  }]
}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

export const asyncRouterMap = [{
  path: '/customerManagement',
  component: Layout,
  name: 'customerManagement',
  redirect: '/customerManagement/addCustomer',
  meta: {
    title: '客户管理',
    icon: 'peoples',
    role: ['admin', 'editor'],
    url: ['customerManagement']
  },
  children: [{
    path: 'addCustomer',
    name: 'addCustomer',
    component: _import('customerManagement/addCustomer'),
    meta: {
      title: '添加客户',
      icon: 'form',
      role: ['admin', 'editor'],
      url: ['addCustomer']
    }
  },
  {
    path: 'customerDetails',
    name: 'customerDetails',
    component: _import('customerManagement/customerDetails'),
    meta: {
      title: '客户详细信息',
      icon: 'user',
      role: ['admin'],
      url: ['customerDetails']
    }
  }
  ]
},
{
  path: '/orderManagement',
  component: Layout,
  name: 'orderManagement',
  redirect: '/orderManagement/mostOrder',
  meta: {
    title: '订单管理',
    icon: 'form',
    url: ['orderManagement']
  },
  children: [{
    path: 'mostOrder',
    name: 'mostOrder',
    component: _import('orderManagement/index'),
    meta: {
      title: '订单',
      icon: 'form',
      url: ['mostOrder']
    }
  },
  {
    path: 'alreadyReleasedOrder',
    name: 'alreadyReleasedOrder',
    component: _import('orderManagement/alreadyPayed'),
    meta: {
      title: '已放款订单',
      icon: 'form',
      url: ['alreadyReleasedOrder']
    }
  }
  ]
}, {
  path: '/customer',
  component: Layout,
  name: 'customer',
  redirect: '/customer/customerList',
  meta: {
    title: '客户管理',
    icon: 'form',
    url: ['customer']

  },
  children: [{
    path: 'customerList',
    name: 'customerList',
    component: _import('customerManagement/customerList'),
    meta: {
      title: '客户列表',
      icon: 'excel',
      url: ['customerList']

    }
  }]
},
{
  path: '/backLogs',
  component: Layout,
  name: 'backLogs',
  redirect: '/backLogs/todayBackLogs',
  meta: {
    title: '待办事项',
    icon: 'tab',
    url: ['backLogs']

  },
  children: [{
    path: 'todayBackLogs',
    name: 'todayBackLogs',
    component: _import('backLog/todays'),
    meta: {
      title: '今日待办事项',
      icon: 'tab',
      url: ['todaysBackLogs']
    }
  }, {
    path: 'allBackLogs',
    name: 'allBackLogs',
    component: _import('backLog/backLogsList'),
    meta: {
      title: '待办事项列表',
      icon: 'tab',
      url: ['allBackLogs']
    }
  }]
},
{
  path: '/logs',
  component: Layout,
  name: 'logs',
  redirect: '/logs/checklogs',
  meta: {
    title: '日志',
    icon: 'tab',
    url: ['logs']

  },
  children: [{
    path: 'checklogs',
    name: 'checklogs',
    component: _import('logs/logs'),
    meta: {
      title: '查看日志',
      icon: 'tab',
      url: ['checklogs']
    }
  }]
},
{
  path: '/statistics',
  name: 'statistics',
  component: Layout,
  redirect: '/statistics/customerChart',
  meta: {
    title: '统计',
    icon: 'chart',
    url: ['statistics']
  },
  children: [{
    path: 'customerChart',
    name: 'default',
    component: _import('chart/index'),
    meta: {
      title: '客户统计',
      icon: 'trendChart1',
      url: ['customerStatistics']
    }
  }, {
    path: 'somebodyDetail',
    name: 'somebodyDetail',
    component: _import('chart/somebodyDetail'),
    hidden: true,
    meta: {
      title: '客户统计详情',
      icon: 'trendChart1',
      url: ['customerStatisticsDetails']
    }
  }, {
    path: 'orderChart',
    name: 'orderChart',
    component: _import('chart/orderChart'),
    meta: {
      title: '订单统计',
      icon: 'trendChart2',
      url: ['orderStatistics']
    }
  }]
},
{
  path: '/permission',
  component: Layout,
  name: 'Permission',
  meta: {
    title: '权限管理',
    icon: 'lock',
    url: ['/permission']
  },
  children: [{
    path: 'manager',
    name: 'Manager',
    component: _import('permission/manager'),
    meta: {
      title: '添加/修改用户',
      icon: 'table',
      url: ['manager']
    }
  },
  {
    path: 'grouping',
    name: 'Grouping',
    component: _import('permission/group'),
    meta: {
      title: '分组管理',
      icon: 'table',
      url: ['grouping']
    }
  },
  {
    path: 'setpermission',
    name: 'Setpermission',
    component: _import('permission/permission'),
    meta: {
      title: '权限设置',
      icon: 'tree',
      url: ['setpermission']
    }
  },
  {
    path: 'setRouter',
    name: 'setRouter',
    component: _import('permission/menu'),
    meta: {
      title: '路由设置',
      icon: 'tree',
      url: ['setrouter']
    }
  }
  ]
},
{
  path: '*',
  redirect: '/404',
  hidden: true
}
]
