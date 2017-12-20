import {
  asyncRouterMap,
  constantRouterMap
} from '@/router/index';

/**
 * 通过path判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(routers, route) {
  if (route.meta) {
    // return roles.some(role => route.meta.role.indexOf(role) >= 0);
    return routers.indexOf(route.meta.url[0]) >= 0;
  } else {
    return true;
  }
  // if (!route.meta) return true;
  // console.log('routers',routers)
  // return routers.indexOf(route.path) >= 0;
  // return true
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param routers
 */
function filterAsyncRouter(asyncRouterMap, routers) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(routers, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, routers);
      }
      return true;
    }
    return false;
  });
  // console.log(accessedRouters)
  return accessedRouters;
}

const router = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({
      commit
    }, data) {
      return new Promise(resolve => {
        const {
          roles,
          routers
        } = data;
        // const roles = ['admin'];
        let accessedRouters;
        if (roles.indexOf(1) >= 0 || roles.indexOf(2) >= 0) {
          accessedRouters = asyncRouterMap;
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, routers);
        }
        // console.log('access',accessedRouters)
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      });
    }
  }
};

export default router;
