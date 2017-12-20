import {
  getCustomerList,
  searchcustomerlist
} from '@/api/customer.js'

const customer = {
  state: {
    pageInfo: null,
    content: null,
    fk_name: null
  },
  getters: {
    customerPage: state => state.pageInfo,
    customerInfo: state => state.content
    // fkInfo: state => state.fk_name
  },
  mutations: {
    GETCUSTOMERLIST: (state, result) => {
      state.pageInfo = result.pageInfo;
      state.content = result.content;
      // state.fk_name = result.fk_name;
    }
  },
  actions: {
    GetCustomerList({
      commit
    }, params = {}) {
      return new Promise((resolve, reject) => {
        getCustomerList(params.pageInfo, params.type).then(result => {
          commit('GETCUSTOMERLIST', {
            content: result.data.list,
            pageInfo: {
              pageSize: Number(result.data.pageSize),
              pageNum: Number(result.data.pageNum),
              totalItems: Number(result.data.totalItems)
            }
          })
          resolve(result)
        })
      })
    },
    SearchCustomerList({
      commit
    }, params = {}) {
      return new Promise((resolve, reject) => {
        searchcustomerlist(params).then(result => {
          commit('GETCUSTOMERLIST', {
            content: result.data.list,
            pageInfo: {
              pageSize: Number(result.data.pageSize),
              pageNum: Number(result.data.pageNum),
              totalItems: Number(result.data.totalItems)
            }
          })
          resolve(result)
        })
      })
    }
  }
}

export default customer
