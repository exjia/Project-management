import {
  apiPersonMainPageList
} from '../../../api/projectMaintenanceApi'
import config from '@/config'
import { formatDate } from '@/libs/util.js'

const personMainList = {
  state: {
    personLista: [],
    loading: false,
    pageNo: 1, // 当前页码
    pageSize: config.pageSize, // 每页记录数
    total: 0, // 总记录数
    pages: 0, // 总页数
    // createTime: '',
    // pageSort: config.createTime,
    // pageOrder: 'desc',
    record: 0
  },
  actions: {
    handlePersonMainList ({ commit }, formQueryData) {
      commit('sendin')
      return new Promise((resolve, reject) => {
        apiPersonMainPageList(formQueryData).then((res) => {
          // console.log('apiPersonMainPageList-------' + res)
          commit('setPersonMainList', res)
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
    setPersonMainList (state, data) {
      state.pageNo = data.data.pageNo
      state.total = data.data.totalPage
      state.record = data.data.totalRecord
      state.pages = data.data.pageSize
      state.personLista = data.data.dataList
      console.log(state.personLista)
      for (var i = 0; i < state.personLista.length; i++) {
        state.personLista[i].createTime = formatDate(new Date(state.personLista[i].createTime), 'yyyy-MM-dd')
        state.personLista[i].updateTime = formatDate(new Date(state.personLista[i].updateTime), 'yyyy-MM-dd')
        state.personLista[i].recordTime = formatDate(new Date(state.personLista[i].recordTime), 'yyyy-MM-dd')
        // state.personLista[i].startTime = formatDate(new Date(state.personLista[i].startTime), 'yyyy-MM-dd')
        // state.personLista[i].endTime = formatDate(new Date(state.personLista[i].endTime), 'yyyy-MM-dd')
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
export default personMainList
