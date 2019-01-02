import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import projectList from './module/projectMaintenanceListStore'
import projectAdd from './module/projectMainTenanceAddStore'
import projectView from './module/projectMaintenanceViewStore'
import personList from './module/personal/persontenanceListStore'
import personMainList from './module/personal/personMaintenanceListStore'
import personAdd from './module/personal/personMainTenanceAddStore'
import personView from './module/personal/personMaintenanceViewStore'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app,
    projectList,
    projectAdd,
    projectView,
    personList,
    personMainList,
    personAdd,
    personView
  }
})
