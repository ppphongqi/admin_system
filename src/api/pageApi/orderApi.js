import request from '@/utils/request'
class OrderApi {
  // 获取实体产品订单列表
  getEntityOrder = (params = {}) => {
    return request({
      url: '/pc/goodsEntity/getEntityOrder',
      method: 'get',
      params,
    })
  }
  //实体产品发货
  sendEntityOrder = (data = {}) => {
    return request({
      url: '/pc/goodsEntity/updateEntityOrder',
      method: 'post',
      data,
    })
  }

  //获取使用借货单的订单
  getEntityLend = (params = {}) => {
    return request({
      url: '/pc/goodsEntity/getGoodsLend',
      method: 'get',
      params,
    })
  }

  //审核使用借货单的订单
  auditEntityLend = (data = {}) => {
    return request({
      url: '/pc/goodsEntity/checkLend',
      method: 'post',
      data,
    })
  }
}

const orderApi = new OrderApi()

export default orderApi
