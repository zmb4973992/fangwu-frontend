import type { RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
  {
    path: "",
    name: "首页",
    redirect: { name: "房源列表" },
  },
  {
    path: "/login",
    name: "登录",
    component: () => import("@/view/login.vue"),
  },
  {
    path: "",
    name: "租房",
    children: [
      {
        path: "/zufang/list",
        name: "房源列表",
        component: () => import("@/view/for-rent/list.vue"),
      },
      {
        path: "/zufang/publish",
        name: "发布房源",
        component: () => import("@/view/for-rent/publish.vue"),
        meta: {
          needLogin: true,
        },
      },
      {
        path: "/zufang/detail/:id",
        name: "房源详情",
        component: () => import("@/view/for-rent/detail.vue"),
        // 路由参数默认是string类型，需要转换成number类型，
        // 便于在组件中使用
        props: (route) => ({ id: Number(route.params.id) }),
      },
      {
        path: "/zufang/update/:id",
        name: "修改房源",
        component: () => import("@/view/for-rent/update.vue"),
        // 路由参数默认是string类型，需要转换成number类型，
        // 便于在组件中使用
        props: (route) => ({ id: Number(route.params.id) }),
        meta: {
          needLogin: true,
        },
      },
    ],
  },
  {
    path: "/center",
    name: "个人中心",
    redirect: { name: "我发布的" },
    children: [
      {
        path: "/center/published",
        name: "我发布的",
        component: () => import("@/view/published.vue"),
        meta: {
          needLogin: true,
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
    path: "/403",
    name: "禁止访问",
    component: () => import("@/view/403.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "未找到",
    component: () => import("@/view/404.vue"),
  },
]

export default routes
