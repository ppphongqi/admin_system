import request from '@/utils/request'

class UserApi {
  // 获取用户账号列表
  getUserList = (data = {}) => {
    return request({
      url: '/pc/user/GetUserList',
      method: 'post',
      data,
    })
  }

  //获取账户类型
  getUserTypeList = (params = {}) => {
    return request({
      url: '/pc/user/userTypeList',
      method: 'get',
      params,
    })
  }
  //修改账号状态
  editUserState = (data = {}) => {
    return request({
      url: '/pc/user/updateUserState',
      method: 'post',
      data,
    })
  }
  //添加用户信息
  addUser = (data = {}) => {
    return request({
      url: '/pc/user/updateUser',
      method: 'post',
      data,
    })
  }
  // 修改用户账号信息
  editUser = (data = {}) => {
    return request({
      url: '/pc/user/updateUser',
      method: 'post',
      data,
    })
  }
  //获取角色列表
  getRoleList = (params = {}) => {
    return request({
      url: '/pc/role/GetRoleList',
      method: 'get',
      params,
    })
  }

  //用户余额充值
  changeBalance = (data = {}) => {
    return request({
      url: '/pc/user/updateBalance',
      method: 'post',
      data,
    })
  }

  //获取用户详情
  getUserDetails = (params = {}) => {
    return request({
      url: '/pc/user/details',
      method: 'get',
      params,
    })
  }
  //设置用户折扣
  setUserDiscount = (data = {}) => {
    return request({
      url: '/pc/user/userDiscount',
      method: 'post',
      data,
    })
  }
  //获取用户折扣
  getUserDiscount = (params = {}) => {
    return request({
      url: '/pc/user/getUserDiscount',
      method: 'get',
      params,
    })
  }
  //删除用户折扣
  delUserDiscount = (data = {}) => {
    return request({
      url: '/pc/user/deleteUserDiscount',
      method: 'post',
      data,
    })
  }
}

const userApi = new UserApi()

export default userApi
