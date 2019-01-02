import axios from '@/libs/api.request'
export const apiPageList = (data) => {
  return axios.request({
    url: '/ssnb/project/task/pageList',
    data,
    method: 'post'
  })
}

export const apiPersonPageList = (data) => {
  return axios.request({
    // url: 'http://10.21.114.71:60000/user/dayReport/pageList',
    url: '/ssnb/user/dayReport/pageList',
    // url: 'https://easy-mock.com/mock/5bfa27868a5108043b0c011f/project-management/user/dayReport/pageList',
    data,
    method: 'post'
  })
}

export const apiPersonMainPageList = (data) => {
  // console.log(data)
  return axios.request({
    url: '/ssnb/user/dayReport/main/pageList',
    // url: 'https://easy-mock.com/mock/5bfa27868a5108043b0c011f/project-management/user/dayReport/main/pageList',
    data,
    method: 'post'
  })
}

export const apiPersonMainPageListDetail = (id) => {
  return axios.request({
    url: '/ssnb/user/dayReport/main/pageList?id=' + id,
    // url: 'https://easy-mock.com/mock/5bfa27868a5108043b0c011f/project-management/user/dayReport/main/pageList?id=' + id,
    data,
    method: 'post'
  })
}

export const apiAddProjectToRev = (data) => {
  return axios.request({
    url: '/ssnb/project/task/add',
    data,
    method: 'post'
  })
}

export const apiAddPersonToRev = (data) => {
  return axios.request({
    url: '/ssnb/day/report/save',
    data,
    method: 'post'
  })
}

export const apiQueryBySearchSystem = (data) => {
  return axios.request({
    url: '/ssnb/project/task/systemName/selectValues',
    method: 'get'
  })
}

export const apiQueryBySearchcompanyName = (data) => {
  return axios.request({
    // url: 'http://10.21.114.71:60000/project/task/companyName/selectValues',
    // url: 'https://www.easy-mock.com/mock/5bfa27868a5108043b0c011f/project-management/project/task/companyName/selectValues',
    url: '/ssnb/project/task/companyName/selectValues',
    method: 'get'
  })
}
export const apiQueryBySearchcompanyName1 = (data) => {
  return axios.request({
    // url: 'http://10.21.114.71:60000/project/task/companyName/selectValues',
    // url: 'https://www.easy-mock.com/mock/5bfa27868a5108043b0c011f/project-management/project/task/companyName/selectValues',
    url: '/ssnb/project/task/companyName/selectValues',
    method: 'get'
  })
}

export const apiQueryBySearchprojectCode = (data) => {
  return axios.request({
    url: '/ssnb/project/task/projectName/selectValues',
    method: 'get'
  })
}

export const apiQueryBySearchprojectName = (data) => {
  return axios.request({
    url: '/ssnb/project/task/projectName/selectValues',
    method: 'get'
  })
}

export const apiQueryBySearchprojectOwnName = (data) => {
  return axios.request({
    url: '/ssnb/project/task/projectOwnName/selectValues',
    method: 'get'
  })
}

export const apiQueryBySearchteamOwnName = (data) => {
  return axios.request({
    url: '/ssnb/project/task/teamOwnName/selectValues',
    method: 'get'
  })
}

export const apiQueryByGetProjectCode = (data) => {
  return axios.request({
    url: '/ssnb/project/task/projectCode/gen?systemName=' + data.label,
    method: 'get'
  })
}

export const apiQuerySystemById = (id) => {
  return axios.request({
    url: '/ssnb/project/task/detail?id=' + id,
    method: 'get'
  })
}

export const apiQueryPersonDayWorkById = (id) => {
  return axios.request({
    // url: '/ssnb/user/dayReport/main/detail?id=' + data.id + '&userCode=' + data.userCode,
    url: '/ssnb/user/dayReport/main/detail?id=' + id,
    // url: 'https://easy-mock.com/mock/5bfa27868a5108043b0c011f/project-management/user/dayReport/main/pageList?id=' + id,
    // params: data,
    method: 'get'
  })
}

export const apiQueryByvalidateProjectNameCheck = (data) => {
  return axios.request({
    url: '/ssnb/project/task/name/verify?projectName=' + data,
    method: 'get'
  })
}

export const apiQueryBySearchSuperiorTask = (data) => {
  return axios.request({
    url: '/ssnb/superior/task/selectValues',
    params: data,
    method: 'get'
  })
}

export const apiQueryBySearchLowerTask = (data) => {
  return axios.request({
    url: '/ssnb/lower/task/selectValues?superiorTaskCode=' + data,
    params: data,
    method: 'get'
  })
}

// export const apiQueryByGetTaskUseTime = (data) => {
//   return axios.request({
//     url: '/ssnb/user/dayReport/main/oneTaskUseTimeCal?startTime='+startTime+'&endTime='+endTime,
//     params: data,
//     method: 'get'
//   })
// }

export const apiQueryByGetTaskUseTime = ({ startTime, endTime }) => {
  const data = {
    startTime,
    endTime
  }
  return axios.request({
    url: '/ssnb/user/dayReport/main/oneTaskUseTimeCal',
    params: data,
    method: 'get'
  })
}
