import request from '@/utils/request'

class DetailApi {
  // 充值明细列表
  getDetail = (data = {}) => {
    return request({
      url: '/pc/TopUpDetail/GetTopUpDetailList',
      method: 'post',
      data,
    })
  }
}

const detailApi = new DetailApi()

export default detailApi
