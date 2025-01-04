import type { RouteRecordRaw } from "vue-router"
import notFound from "@/view/404.vue"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "首页",
    redirect: { name: "房源详情", params: { id: "9" } },
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
      {
        path: "/zufang/detail/:id",
        name: "房源详情",
        component: () => import("@/view/for-rent/detail.vue"),
        // 路由参数默认是string类型，需要转换成number类型，便于在组件中使用
        props: (route) => ({ id: Number(route.params.id) }),
        // 路由守卫
        beforeEnter(to) {
          // 路由参数必须是数字类型，如果不是则重定向到404页面
          if (isNaN(Number(to.params.id))) {
            return { name: "NotFound" }
          }
          // 路由守卫返回true，表示允许访问该页面
          return true
        },
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
    name: "NotFound",
    component: notFound,
  },
]

export default routes
