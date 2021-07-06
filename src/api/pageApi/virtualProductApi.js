import request from '@/utils/request'

class VirtualProductApi {
  // 获取虚拟业务父类型
  getGoodsVirtualClass = (params = {}) => {
    return request({
      url: '/pc/virtual/getGoodsVirtualClass',
      method: 'get',
      params,
    })
  }
  // 获取虚拟业务子类型
  getGoodsVirtualChildClass = (params = {}) => {
    return request({
      url: '/pc/virtual/getGoodsVirtualChildClass',
      method: 'get',
      params,
    })
  }
  // 获取运营商
  getOperator = (params = {}) => {
    return request({
      url: '/pc/virtual/getOperator',
      method: 'get',
      params,
    })
  }
  // 编辑套餐列表
  editingVirtualPackageList = (data = {}) => {
    return request({
      url: '/pc/virtual/editingVirtualPackageList',
      method: 'post',
      data,
    })
  }
  // 获取套餐列表
  getVirtualPackageList = (params = {}) => {
    return request({
      url: '/pc/virtual/getVirtualPackageList',
      method: 'get',
      params,
    })
  }
  // 修改套餐状态
  editingVirtualPackageListState = (data = {}) => {
    return request({
      url: '/pc/virtual/editingVirtualPackageListState',
      method: 'post',
      data,
    })
  }
  // 编辑虚拟产品
  editingGoodsVirtual = (data = {}) => {
    return request({
      url: '/pc/virtual/editingGoodsVirtual',
      method: 'post',
      data,
    })
  }
  // 修改商品状态
  updateGoodsVirtualState = (data = {}) => {
    return request({
      url: '/pc/virtual/updateGoodsVirtualState',
      method: 'post',
      data,
    })
  }
  // 获取支付状态
  getPaymentClass = (params = {}) => {
    return request({
      url: '/pc/virtual/getPaymentClass',
      method: 'get',
      params,
    })
  }
  // 获取订单状态
  getOrderSate = (params = {}) => {
    return request({
      url: '/pc/virtual/getOrderSate',
      method: 'get',
      params,
    })
  }
  // 获取订单
  getVirtualOrder = (params = {}) => {
    return request({
      url: '/pc/virtual/getVirtualOrder',
      method: 'get',
      params,
    })
  }
  // 删除订单
  delVirtualOrderSate = (params = {}) => {
    return request({
      url: '/pc/virtual/changeVirtualOrderSate',
      method: 'get',
      params,
    })
  }
  // 获取虚拟商品列表
  getGoodsVirtual = (params = {}) => {
    return request({
      url: '/pc/virtual/getGoodsVirtual',
      method: 'get',
      params,
    })
  }
}

const virtualProductApi = new VirtualProductApi()

export default virtualProductApi
