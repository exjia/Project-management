import { apiQuerySystemById } from '../../api/projectMaintenanceApi'
import config from '@/config'
import { formatDate } from '@/libs/util.js'

const projectView = {
  state: {
    projectViewData: [],
    loading: false,
    pageNo: 1, // 当前页码
    pageSize: config.pageSize, // 每页记录数
    total: 0, // 总记录数
    pages: 0 // 总页数
  },
  actions: {
    handelQuerySystemViewById ({ commit }, formQueryData) {
      commit('sendin')
      return new Promise((resolve, reject) => {
        apiQuerySystemById(formQueryData).then(res => {
          commit('setSystemViewData', res)
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
    setSystemViewData (state, data) {
      state.projectViewData = data.data
      // console.log(state.projectViewData)
      // for (var i = 0; i < state.projectViewData.length; i++) {
      //     state.projectViewData[i].createTime = formatDate(new Date(state.projectViewData[i].createTime), 'yyyy-MM-dd');
      //     state.projectViewData[i].updateTime = formatDate(new Date(state.projectViewData[i].updateTime), 'yyyy-MM-dd');
      //     state.projectViewData[i].planOnlineDate = formatDate(new Date(state.projectViewData[i].planOnLineDate), 'yyyy-MM-dd');
      //     state.projectViewData[i].realOnlineDate = formatDate(new Date(state.projectViewData[i].realOnlineDate), 'yyyy-MM-dd');
      // }
      state.projectViewData.createTime = formatDate(new Date(state.projectViewData.createTime), 'yyyy-MM-dd')
      state.projectViewData.updateTime = formatDate(new Date(state.projectViewData.updateTime), 'yyyy-MM-dd')
      state.projectViewData.planOnlineDate = formatDate(new Date(state.projectViewData.planOnlineDate), 'yyyy-MM-dd')
      state.projectViewData.realOnlineDate = formatDate(new Date(state.projectViewData.realOnlineDate), 'yyyy-MM-dd')
    },
    sendin (state) {
      state.loading = true
    },
    success (state) {
      state.loading = false
    }
  }
}
export default projectView
