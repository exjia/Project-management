import {
  apiPersonPageList
} from '../../../api/projectMaintenanceApi'
import config from '@/config'

const personList = {
  state: {
    personLista: [],
    loading: false,
    pageNo: 1, // 当前页码
    pageSize: config.pageSize, // 每页记录数
    total: 0, // 总记录数
    pages: 0, // 总页数
    record: 0
  },
  actions: {
    handlePersonList ({ commit }, formQueryData) {
      commit('sendin')
      return new Promise((resolve, reject) => {
        apiPersonPageList(formQueryData).then((res) => {
          commit('setPersonList', res)
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
    setPersonList (state, data) {
      console.log(data)
      state.pageNo = data.data.pageNo
      state.total = data.data.totalPage
      state.record = data.data.totalRecord
      state.pages = data.data.pageSize
      state.personLista = data.data.dataList
    },

    sendin (state) {
      state.loading = true
    },
    success (state) {
      state.loading = false
    }
  }
}
export default personList
