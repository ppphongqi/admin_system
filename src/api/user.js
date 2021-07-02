import request from '@/utils/request'
import { encryptedData } from '@/utils/encrypt'
import { loginRSA, tokenName } from '@/config'

import service from './request.js'

export async function login(data) {
  // return service({
  //   url: '/pc/login/userLogin',
  //   method: 'post',
  //   data,
  // })
  // if (loginRSA) {
  //   data = await encryptedData(data)
  // }
  return request({
    url: '/pc/login/userLogin',
    method: 'post',
    data,
  })
}

export function getUserInfo(accessToken) {
  return request({
    url: '/userInfo',
    method: 'post',
    data: {
      [tokenName]: accessToken,
    },
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post',
  })
}

export function register() {
  return request({
    url: '/register',
    method: 'post',
  })
}
