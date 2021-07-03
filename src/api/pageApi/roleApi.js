import request from '@/utils/request'

class RoleApi {
  // 新增/编辑角色
  addRole = (data = {}) => {
    return request({
      url: '/pc/role/AddUpdateRole',
      method: 'post',
      data,
    })
  }

  // 获取角色列表
  getList = (params = {}) => {
    return request({
      url: '/pc/role/GetRoleList',
      method: 'get',
      params,
    })
  }

  // 删除角色
  deleteRole = (data = {}) => {
    return request({
      url: '/pc/role/DelteRole',
      method: 'post',
      data,
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

  // 新增/编辑角色时，获取权限列表
  getPerList = (params = {}) => {
    return request({
      url: '/pc/role/GetRolePermissionList',
      method: 'get',
      params,
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

  // 新增/编辑权限分类
  addPerType = (data = {}) => {
    return request({
      url: '/pc/permission/DeletePermission',
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

const roleApi = new RoleApi()

export default roleApi
