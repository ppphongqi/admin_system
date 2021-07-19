import request from '@/utils/request'

class PhysicalProductApi {
  // 获取实物产品分类列表
  getEntityClassList = (params = {}) => {
    return request({
      url: '/pc/goodsEntity/getEntityClassList',
      method: 'get',
      params,
    })
  }
  // 增加实物产品分类列表
  addEntityClass = (data = {}) => {
    return request({
      url: '/pc/goodsEntity/entityClass',
      method: 'post',
      data,
    })
  }
  // 删除实物产品分类列表
  delEntityClass = (data = {}) => {
    return request({
      url: '/pc/goodsEntity/deleteEntityClass',
      method: 'post',
      data,
    })
  }
  // 文件上传
  uploadFile = (data = {}) => {
    return request({
      url: '/pc/oss/upload',
      method: 'post',
      data,
    })
  }
  // 获取实物产品列表
  getEntityList = (params = {}) => {
    return request({
      url: '/pc/goodsEntity/getGoodsEntityList',
      method: 'get',
      params,
    })
  }
  // 增加实物产品
  addEntity = (data = {}) => {
    return request({
      url: '/pc/goodsEntity/goodsEntity',
      method: 'post',
      data,
    })
  }
  // 增加实物产品详情
  addEntityDetail = (data = {}) => {
    return request({
      url: '/pc/goodsEntity/goodsParticular',
      method: 'post',
      data,
    })
  }
  // 获取实物产品详情
  getEntityDetail = (params = {}) => {
    return request({
      url: '/pc/goodsEntity/getGoodsParticular',
      method: 'get',
      params,
    })
  }
  // 删除实物产品
  delEntity = (data = {}) => {
    return request({
      url: '/pc/goodsEntity/deleteGoodsEntity',
      method: 'post',
      data,
    })
  }
  // 获取实物产品规格属性列表
  getEntitySpecificationList = (params = {}) => {
    return request({
      url: '/pc/goodsEntity/getGoodsSpecificationList',
      method: 'get',
      params,
    })
  }
  // 设置实物产品规格属性
  setEntitySpecification = (data = {}) => {
    return request({
      url: '/pc/goodsEntity/goodsSpecification',
      method: 'post',
      data,
    })
  }
  // 删除实物产品规格属性
  delEntitySpecification = (data = {}) => {
    return request({
      url: '/pc/goodsEntity/deleteGoodsSpecification',
      method: 'post',
      data,
    })
  }
  // 获取实物产品规格属性值列表
  getEntitySpecificationValueList = (params = {}) => {
    return request({
      url: '/pc/goodsEntity/getGoodsSpecificationValueList',
      method: 'get',
      params,
    })
  }
  // 设置实物产品规格属性值
  setEntitySpecificationValue = (data = {}) => {
    return request({
      url: '/pc/goodsEntity/goodsSpecificationValue',
      method: 'post',
      data,
    })
  }
  // 删除实物产品规格属性值
  delEntitySpecificationValue = (data = {}) => {
    return request({
      url: '/pc/goodsEntity/deleteGoodsSpecificationValue',
      method: 'post',
      data,
    })
  }
  // 获取实物商品订单
  getEntityOrderList = (params = {}) => {
    return request({
      url: '/pc/goodsEntity/getGoodsEntityOrderList',
      method: 'get',
      params,
    })
  }
}

const physicalProductApi = new PhysicalProductApi()

export default physicalProductApi
