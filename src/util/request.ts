import useUserStore from '@/store/user.ts'
import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: import.meta.env.VITE_TIME_OUT,
})

const userStore = useUserStore()

request.interceptors.request.use(
  config => {
    //在请求头添加access_token
    if (userStore.accessToken) {
      config.headers['access_token'] = userStore.accessToken
    }
    return config
  },
)


export default request
