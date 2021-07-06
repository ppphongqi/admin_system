import request from '@/utils/request'

class TaskApi {
  // 获取任务分类列表
  getTasks = (params = {}) => {
    return request({
      url: '/pc/mission/GetMissionClassifyList',
      method: 'get',
      params,
    })
  }

  // 添加任务
  addTasks = (data = {}) => {
    return request({
      url: '/pc/mission/AddUpdateMission',
      method: 'post',
      data,
    })
  }

  // 获取任务类型
  getType = (params = {}) => {
    return request({
      url: '/pc/mission/GetMissionTypeList',
      method: 'get',
      params,
    })
  }

  //给任务分配二维码
  taskForCode = (data = {}) => {
    return request({
      url: '/pc/mission/AddMissionQrCodeMission',
      method: 'post',
      data,
    })
  }

  //添加/修改二维码（链接）
  addCode = (data = {}) => {
    return request({
      url: '/pc/mission/AddUpdateMissionQRCode',
      method: 'post',
      data,
    })
  }

  // 获取任务审核列表
  getTaskAudit = (params = {}) => {
    return request({
      url: '/pc/mission/GetMissionUserSubmitList',
      method: 'get',
      params,
    })
  }

  // 审核操作
  audit = (data = {}) => {
    return request({
      url: '/pc/mission/CheckMission',
      method: 'post',
      data,
    })
  }

  //获取任务列表
  getTaskList = (params = {}) => {
    return request({
      url: '/pc/mission/GetMissionList',
      method: 'get',
      params,
    })
  }
  //获取二维码（链接）列表
  getTaskQrCodeList = (params = {}) => {
    return request({
      url: '/pc/mission/GetMissionQrCodeList',
      method: 'get',
      params,
    })
  }
  //获取二维码状态
  getTaskQrCodeState = (params = {}) => {
    return request({
      url: '/pc/mission/GetMissionState',
      method: 'get',
      params,
    })
  }
  //修改任务状态
  updateTaskState = (params = {}) => {
    return request({
      url: '/pc/mission/MissionState',
      method: 'get',
      params,
    })
  }
  //根据aid查询任务信息（用于修改）
  getTaskInfo = (params = {}) => {
    return request({
      url: '/pc/mission/GetMissionAid',
      method: 'get',
      params,
    })
  }
}

const taskApi = new TaskApi()

export default taskApi
