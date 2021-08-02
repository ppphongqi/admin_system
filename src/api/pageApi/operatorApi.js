import request from '@/utils/request'

class OperatorApi {
  // 获取运营商列表
  getOperatorList = (params = {}) => {
    return request({
      url: '/pc/TopUpDetail/GetTopUpDetailList',
      method: 'get',
      params,
    })
  }
}

const operatorApi = new OperatorApi()

export default operatorApi
