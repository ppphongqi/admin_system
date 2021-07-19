import request from '@/utils/request'

class ChannelApi {
  // 获取通道列表
  getChannel = (params = {}) => {
    return request({
      url: '/pc/channel/getChannel',
      method: 'get',
      params,
    })
  }

  //编辑通道
  editChannel = (data = {}) => {
    return request({
      url: '/pc/channel/editChannel',
      method: 'post',
      data,
    })
  }

  //禁用、开启通道
  channelState = (params = {}) => {
    return request({
      url: '/pc/channel/channelState',
      method: 'get',
      params,
    })
  }

  //设置通道地区折扣
  setChannelDiscount = (data = {}) => {
    return request({
      url: '/pc/channel/settingDiscount',
      method: 'post',
      data,
    })
  }

  //获取通道所有地区
  getChannelDistrict = (params = {}) => {
    return request({
      url: '/pc/channel/getDistrict',
      method: 'get',
      params,
    })
  }

  //获取通道所有地区联动
  getDistrictTwo = (params = {}) => {
    return request({
      url: '/pc/channel/getDistrictTwo',
      method: 'get',
      params,
    })
  }

  //获取通道所有地区联动
  deleteChannel = (params = {}) => {
    return request({
      url: '/pc/channel/deleteChannel',
      method: 'get',
      params,
    })
  }
}

const channelApi = new ChannelApi()

export default channelApi
