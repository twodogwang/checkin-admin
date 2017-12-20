import {
  getorderlist,
  searchorderlist,
  searchpayfororderlist
} from '@/api/orderlist.js'

const order = {
  state: {
    pageInfo: null,
    content: null,
    fk_name: null
  },
  getters: {
    orderPage: state => state.pageInfo,
    orderInfo: state => state.content
    // fkInfo: state => state.fk_name
  },
  mutations: {
    GETORDERLIST: (state, result) => {
      state.pageInfo = result.pageInfo;
      state.content = result.content;
      state.fk_name = result.fk_name;
    }
  },
  actions: {
    GetOrderList({
      commit
    }, params = {}) {
      return new Promise((resolve, reject) => {
        getorderlist(params.pageInfo, params.type).then(result => {
          commit('GETORDERLIST', {
            content: result.data.list,
            pageInfo: {
              pageSize: Number(result.data.pageSize),
              pageNum: Number(result.data.pageNum),
              totalItems: Number(result.data.totalItems)
            },
            fk_name: result.fk_name
          })
          resolve(result)
        })
      })
    },
    SearchOrderList({
      commit
    }, params = {}) {
      return new Promise((resolve, reject) => {
        searchorderlist(params).then(result => {
          commit('GETORDERLIST', {
            content: result.data.list,
            pageInfo: {
              pageSize: Number(result.data.pageSize),
              pageNum: Number(result.data.pageNum),
              totalItems: Number(result.data.totalItems)
            },
            fk_name: result.fk_name
          })
          resolve(result)
        })
      })
    },
    SearchPayforOrderList({
      commit
    }, params = {}) {
      return new Promise((resolve, reject) => {
        searchpayfororderlist(params).then(result => {
          commit('GETORDERLIST', {
            content: result.data.list,
            pageInfo: {
              pageSize: Number(result.data.pageSize),
              pageNum: Number(result.data.pageNum),
              totalItems: Number(result.data.totalItems)
            },
            fk_name: result.fk_name
          })
          resolve(result)
        })
      })
    }
  }
}

export default order
