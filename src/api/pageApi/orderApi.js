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
      url: ' /pc/goodsEntity/updateEntityOrder',
      method: 'post',
      data,
    })
  }
}

const orderApi = new OrderApi()

export default orderApi
