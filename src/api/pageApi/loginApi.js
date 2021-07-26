import request from '@/utils/request'
import { loginRSA, tokenName } from '@/config'

class LoginApi {
  // 登录(手机号+密码)
  login = (data) => {
    return request({
      url: '/pc/login/userLogin',
      method: 'post',
      data,
    })
  }

  //登录（手机号+验证码）
  loginCode = (data) => {
    return request({
      url: '/pc/login/userLoginCode',
      method: 'post',
      data,
    })
  }

  // 登录(账户+密码)
  loginUserName = (data) => {
    return request({
      url: '/pc/login/userNameLogin',
      method: 'post',
      data,
    })
  }

  // 登录(邮箱+密码)
  loginEmail = (data) => {
    return request({
      url: '/pc/login/userLoginEmail',
      method: 'post',
      data,
    })
  }

  // 获取验证码
  getVerificationCode = () => {
    return request({
      url: '/pc/login/verificationCode',
      method: 'get',
      responseType: 'arraybuffer',
    })
  }

  // 获取短信验证码
  getMessageAuthenticationCode = (params = {}) => {
    return request({
      url: '/pc/login/messageAuthenticationCode',
      method: 'get',
      params,
    })
  }

  //注册
  register = (data) => {
    return request({
      url: '/pc/login/userEnroll',
      method: 'post',
      data,
    })
  }

  //找回密码校验手机
  findPwdPhone = (data) => {
    return request({
      url: '/pc/login/findBackThePassword',
      method: 'post',
      data,
    })
  }

  //找回密码校验验证码
  findPwdCode = (data) => {
    return request({
      url: '/pc/login/findBackThePasswordVerificationCode',
      method: 'post',
      data,
    })
  }

  //找回密码修改密码
  findUpdatePwd = (data) => {
    return request({
      url: '/pc/login/updatePassword',
      method: 'post',
      data,
    })
  }

  // 退出登录
  logout = () => {
    return request({
      url: '/pc/login/logout',
      method: 'get',
    })
  }
}

const loginApi = new LoginApi()

export default loginApi
