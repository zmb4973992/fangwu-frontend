import { createRouter, createWebHistory } from "vue-router"
import routes from "@/router/route.ts"

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
