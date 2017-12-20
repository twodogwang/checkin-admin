import {
  getpermissionList
} from '@/api/permission'

const permission = {
  state: {
    permissionInfo: {
      pageInfo: null,
      content: null
    }
  },
  mutations: {
    PERMISSION_INFO: (state, result) => {
      state.permissionInfo.pageInfo = result.pageInfo;
      state.permissionInfo.content = result.data;
    }
  },
  actions: {
    GetPermissionInfo: ({
      commit,
      state
    }, params) => {
      getpermissionList(params).then(result => {
        commit('PERMISSION_INFO', {
          data: result.data.list,
          pageInfo: {
            pageSize: result.data.pageSize,
            pageNum: result.data.pageNum,
            totalItems: result.data.total
          }
        });
      })
    }
  }
}

export default permission
