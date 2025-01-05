import { createRouter, createWebHistory } from "vue-router"
import routes from "@/router/route.ts"
import { createDiscreteApi } from "naive-ui"
import useUserStore from "@/store/user"
import userApi from "@/api/user"

const { message } = createDiscreteApi(["message"])

const router = createRouter({
  history: createWebHistory(),
  routes,
})

//  路由守卫
router.beforeEach(async (to) => {
  const { meta } = to
  const { needLogin } = meta
  const userStore = useUserStore()
  const accessToken = userStore.accessToken
  // 无需登录的话直接放行
  if (!needLogin) {
    return true
  }

  //需要登录，但是有access_token的话，就开始校验access_token是否有效
  if (accessToken) {
    const res = await userApi.getCurrentUser()
    //access_tokeny有效的话，直接放行
    if (res.code === 0) {
      return true
    }
  }

  message.error("请先登录")
  router.push({ name: "登录" })
  return false
})

export default router
