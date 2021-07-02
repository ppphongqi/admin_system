import request from '@/utils/request'
import { loginRSA, tokenName } from '@/config'

class LoginApi {
  // 登录
  login = (data) => {
    return request({
      url: '/pc/login/userLogin',
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
}

const loginApi = new LoginApi()

export default loginApi
