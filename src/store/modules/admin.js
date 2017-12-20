import {
  getadminlist,
  getrolename,
  getzhuanyiList
} from '@/api/admin'

const admin = {
  state: {
    adminInfo: {
      content: null
    },
    role_name: {
      content: null
    },
    permission: {
      pageInfo: null,
      content: null
    },
    zhuanyiList: {
      content: null
    }
  },
  mutations: {
    ADMIN_INFO: (state, result) => {
      state.adminInfo.pageInfo = result.pageInfo;
      state.adminInfo.content = result.data;
    },
    ROLE_NAME: (state, result) => {
      state.role_name.content = result.data;
    },
    GETZHUANYILIST: (state, result) => {
      state.zhuanyiList.content = result.data
    }
  },
  actions: {
    GetAdminInfo: ({
      commit,
      state
    }, params = {}) => {
      console.log("params", params)
      if (params.exit === 0) {
        getadminlist().then(result => {
          commit('ADMIN_INFO', {
            data: result.data
          });
        })
      }
    },
    GetRoleName: ({
      commit,
      state
    }) => {
      getrolename().then(result => {
        commit('ROLE_NAME', {
          data: result.data
        });
      })
    },
    getzhuanyiList: ({
      commit,
      state }) => {
      getzhuanyiList().then(result => {
        commit('GETZHUANYILIST', {
          data: result.data
        });
      })
    }
  }
}
export default admin
