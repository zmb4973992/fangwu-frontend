import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: import.meta.env.VITE_TIME_OUT,
})

export default request
