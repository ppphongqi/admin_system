import request from '@/utils/request'

class TaskApi {
  // 获取任务分类列表
  getTaskClassList = (params = {}) => {
    return request({
      url: '/pc/mission/GetMissionClassifyList',
      method: 'get',
      params,
    })
  }

  //修改任务分类状态
  changeTaskClassStatus = (params = {}) => {
    return request({
      url: '/pc/mission/MissionClassifyState',
      method: 'get',
      params,
    })
  }

  //添加修改任务分类
  addTaskClass = (data = {}) => {
    return request({
      url: '/pc/mission/AddUpdateMissionClassify',
      method: 'post',
      data,
    })
  }

  //删除任务分类
  delTaskClass = (params = {}) => {
    return request({
      url: '/pc/mission/deleteMissionClassify',
      method: 'get',
      params,
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

  //点击编辑时需要的数据
  getTaskData = (params = {}) => {
    return request({
      url: '/pc/mission/GetMissionAid',
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

  // 修改任务
  editTasks = (data = {}) => {
    return request({
      url: '/pc/mission/AddUpdateMission',
      method: 'post',
      data,
    })
  }

  //添加任务
  addTasks = (data = {}) => {
    return request({
      url: '/pc/mission/ImportFileMissionQrCode',
      method: 'post',
      data,
    })
  }

  //二维码图片上传
  uploadImg = (data = {}) => {
    return request({
      url: ' /pc/oss/upload',
      method: 'post',
      data,
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

  //获取二维码（链接）列表
  getTaskQrCodeList = (params = {}) => {
    return request({
      url: '/pc/mission/GetMissionQrCodeList',
      method: 'get',
      params,
    })
  }

  //添加二维码（链接）
  addCode = (data = {}) => {
    return request({
      url: '/pc/mission/AddMissionQRCode',
      method: 'post',
      data,
    })
  }

  //修改二维码
  updateCode = (data = {}) => {
    return request({
      url: '/pc/mission/UpdateMissionQRCode',
      method: 'post',
      data,
    })
  }

  //获取二维码类型
  getType = (params = {}) => {
    return request({
      url: '/pc/mission/GetMissionTypeList',
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
}

const taskApi = new TaskApi()

export default taskApi
