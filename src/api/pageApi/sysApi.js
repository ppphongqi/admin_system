import request from '@/utils/request'

class SysApi {
  // 获取短信参数列表
  getSmsList = (params = {}) => {
    return request({
      url: '/pc/sysSetting/getMasParam',
      method: 'get',
      params,
    })
  }

  //编辑短信参数
  updateSms = (data = {}) => {
    return request({
      url: '/pc/sysSetting/editMasParam',
      method: 'post',
      data,
    })
  }

  //删除短信参数
  delSms = (params = {}) => {
    return request({
      url: '/pc/sysSetting/deleteMasParam',
      method: 'get',
      params,
    })
  }
  //启用短信
  setSmsOn = (params = {}) => {
    return request({
      url: '/pc/sysSetting/closeMasParam',
      method: 'get',
      params,
    })
  }

  //获取域名列表
  getDomainList = (params = {}) => {
    return request({
      url: '/comm/systemCentre/getSystemCentre',
      method: 'get',
      params,
    })
  }

  //编辑域名
  updateDomain = (data = {}) => {
    return request({
      url: '/comm/systemCentre/insertSystemCentre',
      method: 'post',
      data,
    })
  }

  //删除域名
  delDomain = (params = {}) => {
    return request({
      url: '/comm/systemCentre/deleteSystemCentre',
      method: 'get',
      params,
    })
  }

  //域名切换
  changeDomainState = (data = {}) => {
    return request({
      url: '/comm/systemCentre/closeOrOpenSystemCentre',
      method: 'post',
      data,
    })
  }
}

const sysApi = new SysApi()

export default sysApi
