import {
  getTodays,
  getAll
} from '@/api/backLog.js'
import {
  getLogs
} from '@/api/logs.js'

const backLogs = {
  state: {
    todayscontent: null,
    allcontent: null,
    logs: {
      content: null,
      pageInfo: null
    }
  },
  getters: {
    todaysBackLogs: (state) => state.todayscontent,
    allBackLogs: (state) => state.allcontent,
    logsInfo: (state) => state.logs.content,
    logsPage: (state) => state.logs.pageInfo
  },
  mutations: {
    GETTODAYSBACKLOGS: (state, result) => {
      state.todayscontent = result;
    },
    GETALLBACKLOGS: (state, result) => {
      state.allcontent = result;
    },
    GETLOGS: (state, result) => {
      state.logs.content = result.list;
      state.logs.pageInfo = {
        pageNum: result.pageNum,
        pageSize: result.pageSize,
        totalItems: result.totalItems
      };
    }
  },
  actions: {
    getTodaysBackLogs({
      commit
    }, params) {
      return new Promise((resolve, reject) => {
        getTodays(params).then(result => {
          commit('GETTODAYSBACKLOGS', result.todolist)
          resolve(result)
        })
      })
    },
    getAllBackLogs({
      commit
    }, params) {
      return new Promise((resolve, reject) => {
        getAll(params).then(result => {
          commit('GETALLBACKLOGS', result.todolist)
          resolve(result)
        })
      })
    },
    getLogs({
      commit
    }, params) {
      return new Promise((resolve, reject) => {
        getLogs(params).then(result => {
          commit('GETLOGS', result.data)
          resolve(result)
        })
      })
    }
  }
}

export default backLogs
