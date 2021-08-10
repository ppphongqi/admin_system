import request from '@/utils/request'

class OperatorApi {
  //获取运营商分类
  getOperatorClass = (params = {}) => {
    return request({
      url: '/pc/operatorMission/getServiceClass',
      method: 'get',
      params,
    })
  }
  //添加/编辑运营商分类
  updateOperatorClass = (data = {}) => {
    return request({
      url: '/pc/operatorMission/editServiceClass',
      method: 'post',
      data,
    })
  }
  //修改分类状态
  updateOperatorClassState = (data = {}) => {
    return request({
      url: '/pc/operatorMission/updateServiceClassState',
      method: 'post',
      data,
    })
  }
  //删除运营商分类(暂留)
  delOperatorClass = (data = {}) => {
    return request({
      url: '',
      method: 'post',
      data,
    })
  }

  // 获取运营商任务列表
  getOperatorList = (params = {}) => {
    return request({
      url: '/pc/operatorMission/getMissionOperator',
      method: 'get',
      params,
    })
  }
  //添加/修改运营商任务
  updateOperatorList = (data = {}) => {
    return request({
      url: '/pc/operatorMission/editOperatorMission',
      method: 'post',
      data,
    })
  }
  //修改运营商任务状态
  updateOperatorState = (data = {}) => {
    return request({
      url: '/pc/operatorMission/updateOperatorMissionState',
      method: 'post',
      data,
    })
  }
  //删除运营商任务
  delOperatorList = (data = {}) => {
    return request({
      url: '',
      method: 'post',
      data,
    })
  }
  //领取运营商任务
  acceptOperator = (data = {}) => {
    return request({
      url: '/pc/operatorMission/acceptOperatorMission',
      method: 'post',
      data,
    })
  }
  //运营商任务审核
  auditOperator = (data = {}) => {
    return request({
      url: '/pc/operatorMission/checkMissionOperatorCertificate',
      method: 'post',
      data,
    })
  }
  //获取运营商订单状态
  getOperatorOrderState = (params = {}) => {
    return request({
      url: '/pc/operatorMission/getOperatorMissionState',
      method: 'get',
      params,
    })
  }
  //获取运营商订单
  getOperatorOrder = (params = {}) => {
    return request({
      url: '/pc/operatorMission/getOperatorMissionOrder',
      method: 'get',
      params,
    })
  }
  //编辑运营商订单
  updateOperatorOrder = (data = {}) => {
    return request({
      url: '/pc/operatorMission/editOperatorMissionOrder',
      method: 'post',
      data,
    })
  }
  //删除运营商订单
  delOperatorOrder = (params = {}) => {
    return request({
      url: '/pc/operatorMission/deleteOperatorOrder',
      method: 'get',
      params,
    })
  }
}

const operatorApi = new OperatorApi()

export default operatorApi
