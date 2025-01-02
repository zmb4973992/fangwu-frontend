import type { RouteRecordRaw } from "vue-router"
import notFound from "@/view/404.vue"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "首页",
    redirect: { name: "发布房源" },
  },
  {
    path: "/zufang",
    name: "租房",
    children: [
      {
        path: "/zufang/list",
        name: "租房列表",
        component: () => import("@/view/for-rent/list.vue"),
      },
      {
        path: "/zufang/publish",
        name: "发布房源",
        component: () => import("@/view/for-rent/publish.vue"),
      },
    ],
  },
  {
    path: "/zhaofang",
    name: "找房",
    component: () => import("@/view/seek-house.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: notFound,
  },
]

export default routes
