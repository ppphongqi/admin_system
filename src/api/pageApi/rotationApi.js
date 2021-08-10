import request from '@/utils/request'

class RotationApi {
  //获取轮播图分类
  getRotationClass = (params = {}) => {
    return request({
      url: '/pc/slideShow/getSlideClass',
      method: 'get',
      params,
    })
  }
  //新增/修改轮播图分类
  updateRotationClass = (data = {}) => {
    return request({
      url: '/pc/slideShow/slideClass',
      method: 'post',
      data,
    })
  }
  //删除轮播图分类
  delRotationClass = (data = {}) => {
    return request({
      url: '/pc/slideShow/deleteSlideClass',
      method: 'post',
      data,
    })
  }
  //获取轮播图
  getRotation = (params = {}) => {
    return request({
      url: '/pc/slideShow/getSlideShow',
      method: 'get',
      params,
    })
  }
  //新增/修改轮播图
  updateRotation = (data = {}) => {
    return request({
      url: '/pc/slideShow/slideShow',
      method: 'post',
      data,
    })
  }
  //删除轮播图
  delRotation = (data = {}) => {
    return request({
      url: '/pc/slideShow/deleteSlideShow',
      method: 'post',
      data,
    })
  }
}

const rotationApi = new RotationApi()

export default rotationApi
