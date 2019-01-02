import {
  apiPageList,
  apiQueryBySearchSystem,
  apiQueryBySearchcompanyName,
  apiQueryBySearchprojectCode,
  apiQueryBySearchprojectName,
  apiQueryBySearchprojectOwnName,
  apiQueryBySearchteamOwnName
} from '../../api/projectMaintenanceApi'
import config from '@/config'
import { formatDate } from '@/libs/util.js'

const projectList = {
  state: {
    projectLista: [],
    pageNo: 1, // 当前页码
    pageSize: config.pageSize, // 每页记录数
    total: 0, // 总记录数
    pages: 0, // 总页数
    record: 0,
    searchSystemData: [],
    searchCompanyData: [],
    searchprojectCodeData: [],
    searchprojectNameData: [],
    searchprojectOwnNameData: [],
    searchteamOwnNameData: [],
    loading: false,
    message: ''
  },
  actions: {
    handleProjectList ({ commit }, formQueryData) {
      commit('sendin')
      return new Promise((resolve, reject) => {
        apiPageList(formQueryData).then((res) => {
          commit('setProjectList', res)
          commit('success')
          resolve()
        }).catch((err) => {
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
    handleQueryBySearchcompanyName ({ commit }, CompanySearchData) {
      // commit('sendin')
      return new Promise((resolve, reject) => {
        apiQueryBySearchcompanyName(CompanySearchData).then(res => {
          commit('setCompanySeachData', res)
          commit('success')
          resolve()
        }).catch(err => {
          commit('success')
          reject(err)
        })
      })
    },
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
    handleQueryBySearchprojectName ({ commit }, ProjectNameSearchData) {
      // commit('sendin')
      return new Promise((resolve, reject) => {
        apiQueryBySearchprojectName(ProjectNameSearchData).then(res => {
          commit('setProjectNameSeachData', res)
          commit('success')
          resolve()
        }).catch(err => {
          commit('success')
          reject(err)
        })
      })
    },
    handleQueryBySearchprojectOwnName ({ commit }, ProjectOwnNameSearchData) {
      // commit('sendin')
      return new Promise((resolve, reject) => {
        apiQueryBySearchprojectOwnName(ProjectOwnNameSearchData).then(res => {
          commit('setProjectOwnNameSeachData', res)
          commit('success')
          resolve()
        }).catch(err => {
          commit('success')
          reject(err)
        })
      })
    },
    handleQueryBySearchteamOwnName ({ commit }, TeamOwnNameSearchData) {
      // commit('sendin')
      return new Promise((resolve, reject) => {
        apiQueryBySearchteamOwnName(TeamOwnNameSearchData).then(res => {
          commit('setTeamOwnNameSeachData', res)
          commit('success')
          resolve()
        }).catch(err => {
          commit('success')
          reject(err)
        })
      })
    }
  },
  mutations: {
    setProjectList (state, data) {
      state.pageNo = data.data.pageNo
      state.total = data.data.totalPage
      state.record = data.data.totalRecord
      state.pages = data.data.pageSize
      state.projectLista = data.data.dataList
      // console.log(state.projectLista)
      for (var i = 0; i < state.projectLista.length; i++) {
        state.projectLista[i].planOnlineDate = formatDate(new Date(state.projectLista[i].planOnlineDate), 'yyyy-MM-dd')
        state.projectLista[i].createTime = formatDate(new Date(state.projectLista[i].createTime), 'yyyy-MM-dd')
        state.projectLista[i].updateTime = formatDate(new Date(state.projectLista[i].updateTime), 'yyyy-MM-dd')
      }
    },
    setSystemSeachData (state, data) {
      state.searchSystemData = data.data
      // console.log('setSystemSeachData', data)
      state.message = data.message
    },
    setCompanySeachData (state, data) {
      // console.log('setCompanySeachData', data)
      state.searchCompanyData = data.data
      state.message = data.message
    },
    setProjectCodeSeachData (state, data) {
      // console.log('setProjectCodeSeachData', data)
      state.searchprojectCodeData = data.data
      state.message = data.message
    },
    setProjectNameSeachData (state, data) {
      // console.log('setProjectNameSeachData', data)
      state.searchprojectNameData = data.data
      state.message = data.message
    },
    setProjectOwnNameSeachData (state, data) {
      // console.log('setProjectOwnNameSeachData', data)
      state.searchprojectOwnNameData = data.data
      state.message = data.message
    },
    setTeamOwnNameSeachData (state, data) {
      // console.log('setTeamOwnNameSeachData', data)
      state.searchteamOwnNameData = data.data
      state.message = data.message
    },
    sendin (state) {
      state.loading = true
    },
    success (state) {
      state.loading = false
    }
  }
}
export default projectList
