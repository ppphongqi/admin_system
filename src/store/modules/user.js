/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description 登录、获取用户信息、退出登录、清除accessToken逻辑，不建议修改
 */

import Vue from 'vue'
import { getUserInfo, login, logout } from '@/api/user'
import { loginApi } from '@/api/index'
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from '@/utils/accessToken'
import { resetRouter } from '@/router'
import { title, tokenName } from '@/config'

const state = () => ({
  accessToken: getAccessToken(),
  username: localStorage.getItem('username'),
  avatar: '',
  permissions: [],
})
const getters = {
  accessToken: (state) => state.accessToken,
  username: (state) => state.username,
  avatar: (state) => state.avatar,
  permissions: (state) => state.permissions,
}
const mutations = {
  setAccessToken(state, accessToken) {
    console.log('token', accessToken, '11')
    state.accessToken = accessToken
    setAccessToken(accessToken)
  },
  setUsername(state, username) {
    state.username = username
    localStorage.setItem('username', username)
  },
  setAvatar(state, avatar) {
    state.avatar = avatar
  },
  setPermissions(state, permissions) {
    state.permissions = permissions
  },
}
const actions = {
  setPermissions({ commit }, permissions) {
    commit('setPermissions', permissions)
  },
  async login({ commit }, userInfo) {
    console.log(userInfo, 'userinfo')
    const { data } = await login(userInfo)
    console.log(data, 'login_data')
    const accessToken = data[tokenName]
    console.log(accessToken)
    if (accessToken) {
      commit('setAccessToken', accessToken)
      commit('setUsername', userInfo.phone)
      const hour = new Date().getHours()
      const thisTime =
        hour < 8
          ? '早上好'
          : hour <= 11
          ? '上午好'
          : hour <= 13
          ? '中午好'
          : hour < 18
          ? '下午好'
          : '晚上好'
      Vue.prototype.$baseNotify(`欢迎登录${title}`, `${thisTime}！`)
    } else {
      Vue.prototype.$baseMessage(
        `登录接口异常，未正确返回${tokenName}...`,
        'error'
      )
    }
  },
  async loginCode({ commit }, userInfo) {
    console.log(userInfo, 'userinfo')
    const { data } = await loginApi.loginCode(userInfo)
    console.log(data, 'login_data')
    const accessToken = data[tokenName]
    console.log(accessToken)
    if (accessToken) {
      commit('setAccessToken', accessToken)
      const hour = new Date().getHours()
      const thisTime =
        hour < 8
          ? '早上好'
          : hour <= 11
          ? '上午好'
          : hour <= 13
          ? '中午好'
          : hour < 18
          ? '下午好'
          : '晚上好'
      Vue.prototype.$baseNotify(`欢迎登录${title}`, `${thisTime}！`)
    } else {
      Vue.prototype.$baseMessage(
        `登录接口异常，未正确返回${tokenName}...`,
        'error'
      )
    }
  },
  async loginUserName({ commit }, userInfo) {
    console.log(userInfo, 'userinfo')
    const { data } = await loginApi.loginUserName(userInfo)
    console.log(data, 'login_data')
    const accessToken = data[tokenName]
    console.log(accessToken)
    if (accessToken) {
      commit('setAccessToken', accessToken)
      const hour = new Date().getHours()
      const thisTime =
        hour < 8
          ? '早上好'
          : hour <= 11
          ? '上午好'
          : hour <= 13
          ? '中午好'
          : hour < 18
          ? '下午好'
          : '晚上好'
      Vue.prototype.$baseNotify(`欢迎登录${title}`, `${thisTime}！`)
    } else {
      Vue.prototype.$baseMessage(
        `登录接口异常，未正确返回${tokenName}...`,
        'error'
      )
    }
  },
  async loginEmail({ commit }, userInfo) {
    console.log(userInfo, 'userinfo')
    const { data } = await loginApi.loginEmail(userInfo)
    console.log(data, 'login_data')
    const accessToken = data[tokenName]
    console.log(accessToken)
    if (accessToken) {
      commit('setAccessToken', accessToken)
      const hour = new Date().getHours()
      const thisTime =
        hour < 8
          ? '早上好'
          : hour <= 11
          ? '上午好'
          : hour <= 13
          ? '中午好'
          : hour < 18
          ? '下午好'
          : '晚上好'
      Vue.prototype.$baseNotify(`欢迎登录${title}`, `${thisTime}！`)
    } else {
      Vue.prototype.$baseMessage(
        `登录接口异常，未正确返回${tokenName}...`,
        'error'
      )
    }
  },
  async getUserInfo({ commit, state }) {
    // let { data } = await getUserInfo(state.accessToken)
    // if (!data) {
    //   Vue.prototype.$baseMessage('验证失败，请重新登录...', 'error')
    //   return false
    // }
    let data = {}
    data.permissions = ['admin']
    data.username = state.username
    data.avatar = 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif'
    console.log(data, 'data')
    let { permissions, username, avatar } = data
    if (permissions && username && Array.isArray(permissions)) {
      commit('setPermissions', permissions)
      commit('setUsername', username)
      commit('setAvatar', avatar)
      return permissions
    } else {
      Vue.prototype.$baseMessage('用户信息接口异常', 'error')
      return false
    }
  },
  async logout({ dispatch }) {
    await loginApi.logout(state.accessToken) // 暂时注释
    await dispatch('resetAccessToken')
    await resetRouter()
  },
  resetAccessToken({ commit }) {
    commit('setPermissions', [])
    commit('setAccessToken', '')
    removeAccessToken()
  },
}
export default { state, getters, mutations, actions }
