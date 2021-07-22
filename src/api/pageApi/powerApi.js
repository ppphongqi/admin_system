import request from '@/utils/request'

class PowerApi {
  //获取权限列表
  getPermissionList = (params = {}) => {
    return request({
      url: '/pc/permission/PermissionList',
      method: 'get',
      params,
    })
  }
  // 新增/编辑权限
  addPermission = (data) => {
    return request({
      url: '/pc/permission/AddUpdatePermission',
      method: 'post',
      data,
    })
  }
  // 删除权限
  deletePer = (params = {}) => {
    return request({
      url: '/pc/permission/DeletePermission',
      method: 'get',
      params,
    })
  }
  //获取权限分类
  getPerClass = (params = {}) => {
    return request({
      url: '/pc/permission/GetPermissionClassifyList',
      method: 'get',
      params,
    })
  }

  // 新增/编辑权限分类
  addPerType = (data = {}) => {
    return request({
      url: '/pc/permission/AddUpdatePermissionClassify',
      method: 'post',
      data,
    })
  }

  //删除权限分类
  deletePerType = (params = {}) => {
    return request({
      url: '/pc/permission/DeletePermissionClassify',
      method: 'get',
      params,
    })
  }
}

const powerApi = new PowerApi()

export default powerApi
