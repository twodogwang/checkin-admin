import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import admin from './modules/admin'
import group from './modules/group'
import permission from './modules/permission'
import router from './modules/router'
import orderlist from './modules/orderlist'
import customer from './modules/customer'
import backLogs from './modules/backLog'
import charts from './modules/charts'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    admin,
    group,
    permission,
    router,
    orderlist,
    customer,
    backLogs,
    charts
  },
  getters
})

export default store
