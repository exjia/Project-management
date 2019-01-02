import { apiQueryPersonDayWorkById } from '../../../api/projectMaintenanceApi'
import config from '@/config'
import { formatDate } from '@/libs/util.js'

const personView = {
  state: {
    personViewData: [],
    loading: false,
    pageNo: 1, // 当前页码
    pageSize: config.pageSize, // 每页记录数
    total: 0, // 总记录数
    pages: 0 // 总页数
  },
  actions: {
    handelQueryPersonDayWorkById ({ commit }, formQueryData) {
      commit('sendin')
      return new Promise((resolve, reject) => {
        apiQueryPersonDayWorkById(formQueryData).then(res => {
          commit('setPersonDayWorkData', res)
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
    setPersonDayWorkData (state, data) {
      console.log(data)
      state.personViewData = data.data

      state.personViewData.createTime = formatDate(new Date(state.personViewData.createTime), 'yyyy-MM-dd')
      state.personViewData.updateTime = formatDate(new Date(state.personViewData.updateTime), 'yyyy-MM-dd')
      state.personViewData.recordTime = formatDate(new Date(state.personViewData.recordTime), 'yyyy-MM-dd')
      // state.personViewData.startTime = formatDate(new Date(state.personViewData.startTime), 'yyyy-MM-dd')
      // state.personViewData.endTime = formatDate(new Date(state.personViewData.endTime), 'yyyy-MM-dd')
    },
    sendin (state) {
      state.loading = true
    },
    success (state) {
      state.loading = false
    }
  }
}
export default personView
