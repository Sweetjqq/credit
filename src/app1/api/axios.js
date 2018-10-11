import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.API_GATEWAY,
  withCredentials: true
})

instance.interceptors.request.use(config => {
  config.params = config.params || {}
  // prevent browser side cache
  config.params.ts = new Date().getTime()
  return config
})

export default instance
