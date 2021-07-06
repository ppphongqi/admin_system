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
  // 修改用户账号信息
  updateUser = (data = {}) => {
    return request({
      url: '/pc/user/updateUser',
      method: 'post',
      data,
    })
  }
}

const userApi = new UserApi()

export default userApi
