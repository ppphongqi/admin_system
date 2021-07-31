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

  //获取规格模板
  getEntitySpecification = (params = {}) => {
    return request({
      url: '/pc/goodsEntity/getSpecification',
      method: 'get',
      params,
    })
  }

  //添加/编辑规格模板
  setEntitySpecification = (data = {}) => {
    return request({
      url: '/pc/goodsEntity/goodsSpecification',
      method: 'post',
      data,
    })
  }

  //删除规格模板
  delEntitySpecification = (data = {}) => {
    return request({
      url: '/pc/goodsEntity/deleteGoodsSpecification',
      method: 'post',
      data,
    })
  }

  //获取规格明细
  getEntitySpecificationInfo = (params = {}) => {
    return request({
      url: '/pc/goodsEntity/getGoodsSpecificationList',
      method: 'get',
      params,
    })
  }

  //设置规格
  setEntitySpecificationKey = (data = {}) => {
    return request({
      url: '/pc/goodsEntity/goodsSpecificationKey',
      method: 'post',
      data,
    })
  }

  //删除规格
  delEntitySpecificationKey = (data = {}) => {
    return request({
      url: '  /pc/goodsEntity/deleteGoodsSpecificationKey',
      method: 'post',
      data,
    })
  }

  //设置规格属性
  setEntitySpecificationValue = (data = {}) => {
    return request({
      url: '/pc/goodsEntity/goodsSpecificationValue',
      method: 'post',
      data,
    })
  }

  //删除规格属性
  delEntitySpecificationValue = (data = {}) => {
    return request({
      url: '/pc/goodsEntity/deleteGoodsSpecificationValue',
      method: 'post',
      data,
    })
  }

  //获取单一商品属性
  getEntityProperty = (params = {}) => {
    return request({
      url: '/pc/goodsEntity/getGoodsEntityProperty',
      method: 'get',
      params,
    })
  }

  //设置单一商品属性
  setEntityProperty = (data = {}) => {
    return request({
      url: '/pc/goodsEntity/goodsEntityProperty',
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
