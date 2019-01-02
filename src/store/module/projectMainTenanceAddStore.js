import { formatDate } from '@/libs/util.js'
import {
  apiQueryBySearchSystem,
  apiQueryBySearchcompanyName1,
  apiQueryBySearchprojectName,
  apiAddProjectToRev,
  apiQueryByGetProjectCode,
  apiQueryByvalidateProjectNameCheck,
  apiQueryBySearchprojectOwnName,
  apiQueryBySearchteamOwnName
} from '../../api/projectMaintenanceApi'

const projectAdd = {
  state: {
    searchProjectData: {
      projectCode: '',
      projectName: '',
      companyCode: '',
      companyName: '',
      systemCode: '',
      systemName: '',
      projectOwnCode: '',
      projectOwnName: '',
      teamOwnCode: '',
      teamOwnName: '',
      itPerson: '',
      businessPerson: '',
      proposeDepartment: '',
      planOnlineDate: '',
      realOnlineDate: '',
      isOnline: '',
      projectStatus: '',
      remark: '',
      svn1: '',
      svn2: '',
      svn3: '',
      projectSvn: '',
      settleSvn: '',
      createBy: '',
      createName: '',
      updateBy: '',
      updateName: '',
      createTime: '',
      updateTime: ''
    },
    searchCompanyData: {},
    searchSystemData: {},
    searchprojectNameData: [],
    searchgetProjectCode: {},
    searchvalidateProjectNameCheck: {},
    searchprojectOwnNameData: [],
    searchteamOwnNameData: [],
    message: '',
    loading: false
  },
  actions: {
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
    handleQueryBySearchcompanyName1 ({ commit }, CompanySearchData) {
      // commit('sendin')
      return new Promise((resolve, reject) => {
        apiQueryBySearchcompanyName1(CompanySearchData).then(res => {
          commit('setCompanySeachData', res)
          commit('success')
          resolve()
        }).catch(err => {
          commit('success')
          reject(err)
        })
      })
    },
    handleQueryByGetProjectCode ({ commit }, GetProjectCode) {
      // commit('sendin')
      return new Promise((resolve, reject) => {
        apiQueryByGetProjectCode(GetProjectCode).then(res => {
          commit('setGetProjectCode', res)
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
    },
    handlevalidateProjectNameCheck ({ commit }, GetvalidateProjectNameCheck) {
      // commit('sendin')
      return new Promise((resolve, reject) => {
        apiQueryByvalidateProjectNameCheck(GetvalidateProjectNameCheck).then(res => {
          console.log(res)
          commit('setvalidateProjectNameCheck', res)
          commit('success')
          resolve()
        }).catch(err => {
          commit('success')
          reject(err)
        })
      })
    },
    handleResetSearchProjectData ({ commit }) {
      commit('resetSearchProjectData')
    },
    handleAddProjectToRev ({ commit }, data) {
      console.log(data)
      data.planOnlineDate = formatDate(new Date(data.planOnlineDate), 'yyyy-MM-dd')
      commit('sendin')
      return new Promise((resolve, reject) => {
        apiAddProjectToRev(data).then((res) => {
          commit('setAddProjectToRev', res)
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
    setSystemSeachData (state, data) {
      state.searchSystemData = data.data
      state.message = data.message
    },
    setCompanySeachData (state, data) {
      state.searchCompanyData = data.data
      state.message = data.message
    },
    setProjectNameSeachData (state, data) {
      // console.log(data.data.data)
      state.searchprojectNameData = data.data
      state.message = data.message
    },
    setGetProjectCode: function (state, data) {
      console.log('setGetProjectCode', data)
      state.searchgetProjectCode = data.data
      state.message = data.message
    },
    setvalidateProjectNameCheck: function (state, data) {
      console.log('setvalidateProjectNameCheck', data)
      state.searchvalidateProjectNameCheck = data.data
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
    setAddProjectToRev: function (state, data) {
      console.log(data)
      state.message = data.message
    },
    resetSearchProjectData: function (state) {
      state.searchProjectData = {
        projectCode: '',
        projectName: '',
        companyCode: '',
        companyName: '',
        systemCode: '',
        systemName: '',
        projectOwnCode: '',
        projectOwnName: '',
        teamOwnCode: '',
        teamOwnName: '',
        itPerson: '',
        businessPerson: '',
        proposeDepartment: '',
        planOnlineDate: '',
        realOnlineDate: '',
        isOnline: '',
        projectStatus: '',
        remark: '',
        svn1: '',
        svn2: '',
        svn3: '',
        projectSvn: '',
        settleSvn: '',
        createBy: '',
        createName: '',
        updateBy: '',
        updateName: '',
        createTime: '',
        updateTime: ''
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
export default projectAdd
