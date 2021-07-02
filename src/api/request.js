import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL =
  process.env.NODE_ENV === 'production' ? 'http://116.52.6.96:19008' : '/api'
axios.defaults.timeout = 40000

const service = axios.create({
  // retry: 2, // 请求次数,
  // retryInterval: 1000 // 请求超时后，1s再次请求
})

service.interceptors.request.use(
  function (config) {
    // 请求之前的处理,token,(js-cookie),store处理
    console.log('start')
    // store.commit('startLoading') // 调用全局加载
    config.method === 'post'
      ? (config.data = qs.stringify({ ...config.data }))
      : (config.params = { ...config.params })
    // config.headers['Content-type'] = 'application/x-www-form-urlencoded;chartset=UTF-8';z
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default service
