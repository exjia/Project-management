import { formatDate, isEmpty } from '@/libs/util.js'
import {
  apiQueryBySearchprojectCode,
  apiQueryBySearchSystem,
  apiAddPersonToRev,
  apiQueryBySearchSuperiorTask,
  apiQueryByGetTaskUseTime,
  apiQueryBySearchLowerTask
} from '../../../api/projectMaintenanceApi'

const personAdd = {
  state: {
    addPersonData: {
      userCode: '',
      userName: '',
      recordTime: '',
      projectTaskCode: '',
      projectTaskName: '',
      modularName: '',
      systemName: '',
      superiorTask: '',
      lowerTask: '',
      startTime: '',
      endTime: '',
      taskCompletePercent: '',
      taskUseTime: '',
      workInfoRemake: ''
    },
    searchprojectCodeData: {},
    searchSystemData: {},
    searchSuperiorTaskData: [],
    searchLowerTaskData: [],
    getTaskUseTimedata: {},
    loading: false
  },
  actions: {
    handleQueryBySearchprojectCode ({ commit }, ProjectCodeSearchData) {
      // commit('sendin')
      return new Promise((resolve, reject) => {
        apiQueryBySearchprojectCode(ProjectCodeSearchData).then(res => {
          commit('setProjectCodeSeachData', res)
          commit('success')
          resolve()
        }).catch(err => {
          commit('success')
          reject(err)
        })
      })
    },
    handleQueryBySearchSystem ({ commit }, SystemSearchData) {
      // commit('sendin')
      return new Promise((resolve, reject) => {
        apiQueryBySearchSystem(SystemSearchData).then(res => {
          commit('setSystemSeachData', res)
          commit('success')
          resolve()
        }).catch(err => {
          commit('success')
          reject(err)
        })
      })
    },
    handleResetSearchPersonData ({ commit }) {
      commit('resetSearchProjectData')
    },
    handleQueryBysearchSuperiorTask ({ commit }, SuperiorTaskData) {
      // commit('sendin')
      return new Promise((resolve, reject) => {
        apiQueryBySearchSuperiorTask(SuperiorTaskData).then(res => {
          commit('setSuperiorTaskData', res)
          commit('success')
          resolve()
        }).catch(err => {
          commit('success')
          reject(err)
        })
      })
    },
    handleQueryBysearchLowerTask ({ commit }, LowerTaskTaskData) {
      // commit('sendin')
      return new Promise((resolve, reject) => {
        apiQueryBySearchLowerTask(LowerTaskTaskData).then(res => {
          commit('setLowerTaskData', res)
          commit('success')
          resolve()
        }).catch(err => {
          commit('success')
          reject(err)
        })
      })
    },
    handleQueryBygetTaskUseTime ({ commit }, GetTaskUseTimeData) {
      // commit('sendin')
      return new Promise((resolve, reject) => {
        apiQueryByGetTaskUseTime(GetTaskUseTimeData).then(res => {
          commit('setGetTaskUseTime', res)
          commit('success')
          resolve()
        }).catch(err => {
          commit('success')
          reject(err)
        })
      })
    },
    handleAddPersonToRev ({ commit }, data) {
      console.log(data)
      data.planOnlineDate = formatDate(new Date(data.planOnlineDate), 'yyyy-MM-dd')
      commit('sendin')
      return new Promise((resolve, reject) => {
        apiAddPersonToRev(data).then((res) => {
          commit('setAddPersonToRev', res)
          commit('success')
          resolve()
        }).catch((err) => {
          commit('success')
          reject(err)
        })
      })
    }
  },
  mutations: {
    setProjectCodeSeachData (state, data) {
      console.log('setProjectCodeSeachData', data)
      state.searchprojectCodeData = data.data
      state.message = data.message
    },
    setSystemSeachData (state, data) {
      state.searchSystemData = data.data
      state.message = data.message
    },
    setSuperiorTaskData (state, data) {
      // console.log('setSuperiorTaskData', data)
      state.searchSuperiorTaskData = data.data
      state.message = data.message
    },
    setLowerTaskData (state, data) {
      // console.log('setLowerTaskData', data)
      state.searchLowerTaskData = data.data
      state.message = data.message
    },
    setGetTaskUseTime (state, data) {
      state.getTaskUseTimedata = data.data
      state.message = data.message
      // console.log('getTaskUseTime', state.getTaskUseTime)
    },
    setAddPersonToRev: function (state, data) {
      state.message = data.message
      // console.log(state.message)
    },
    resetSearchPersonData: function (state) {
      state.addPersonData = {
        userCode: '',
        userName: '',
        recordTime: '',
        projectTaskCode: '',
        projectTaskName: '',
        modularName: '',
        systemName: '',
        superiorTask: '',
        lowerTask: '',
        startTime: '',
        endTime: '',
        taskCompletePercent: '',
        taskUseTime: '',
        workInfoRemake: ''
      }
    },
    sendin (state) {
      state.loading = true
    },
    success (state) {
      state.loading = false
    }
  }
}
export default personAdd
