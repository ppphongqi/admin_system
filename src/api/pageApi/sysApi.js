import request from '@/utils/request'

class SysApi {
  // 获取短信模板列表
  getSmsList = (params = {}) => {
    return request({
      url: '/pc/sysSetting/getSms',
      method: 'get',
      params,
    })
  }

  //编辑短信模板
  updateSms = (data = {}) => {
    return request({
      url: '/pc/sysSetting/updateSms',
      method: 'post',
      data,
    })
  }

  // 获取短信配置
  getSms = (params = {}) => {
    return request({
      url: '/pc/sysSetting/getSystemMas',
      method: 'get',
      params,
    })
  }

  //编辑短信模板
  updateSms = (data = {}) => {
    return request({
      url: '/pc/sysSetting/updateSystemMas',
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
  //修改密码
  updatePwd = (data = {}) => {
    return request({
      url: '/pc/sysSetting/UpdatePersonalCenter',
      method: 'post',
      data,
    })
  }

  //获取oss配置
  getOss = (params = {}) => {
    return request({
      url: '/pc/sysSetting/getUploading',
      method: 'get',
      params,
    })
  }
  //修改oss配置
  updateOss = (data = {}) => {
    return request({
      url: '/pc/sysSetting/updateUploading',
      method: 'post',
      data,
    })
  }
  //获取支付宝支付配置
  getAliPay = (params = {}) => {
    return request({
      url: '/pc/sysSetting/getAlipayPayment',
      method: 'get',
      params,
    })
  }
  //修改支付宝支付配置
  updateAliPay = (data = {}) => {
    return request({
      url: '/pc/sysSetting/updateAlipayPayment',
      method: 'post',
      data,
    })
  }
  //获取微信支付配置
  getWechatPay = (params = {}) => {
    return request({
      url: '/pc/sysSetting/getWechatPayment',
      method: 'get',
      params,
    })
  }
  //修改微信支付配置
  updateWechatPay = (data = {}) => {
    return request({
      url: '/pc/sysSetting/updateWechatPayment',
      method: 'post',
      data,
    })
  }
  //获取微信登录配置
  getWechatLogin = (params = {}) => {
    return request({
      url: '/pc/sysSetting/getWechatLogin',
      method: 'get',
      params,
    })
  }
  //修改微信登录配置
  updateWechatLogin = (data = {}) => {
    return request({
      url: '/pc/sysSetting/updateWechatLogin',
      method: 'post',
      data,
    })
  }
  //获取小程序登录配置
  getAppletLogin = (params = {}) => {
    return request({
      url: '/pc/sysSetting/getWechat',
      method: 'get',
      params,
    })
  }
  //修改小程序登录配置
  updateAppletLogin = (data = {}) => {
    return request({
      url: '/pc/sysSetting/updateWechat',
      method: 'post',
      data,
    })
  }
  //获取logo配置
  getAppLogo = (params = {}) => {
    return request({
      url: '/pc/sysSetting/getLogo',
      method: 'get',
      params,
    })
  }
  //修改logo配置
  updateAppLogo = (data = {}) => {
    return request({
      url: '/pc/sysSetting/updateLogo',
      method: 'post',
      data,
    })
  }
}

const sysApi = new SysApi()

export default sysApi
