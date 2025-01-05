import useUserStore from "@/store/user.ts"
import axios from "axios"

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: import.meta.env.VITE_TIME_OUT,
})

// 请求拦截器
request.interceptors.request.use((config) => {
  const userStore = useUserStore()

  //在请求头添加access_token
  if (userStore.accessToken) {
    const userStore = useUserStore()
    config.headers["access_token"] = userStore.accessToken
  }
  return config
})

export default request
