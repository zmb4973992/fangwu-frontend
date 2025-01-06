import type { RouteRecordRaw } from "vue-router"
import { availableCityAbbr } from "@/constant"
import useCityStore from "@/store/city"

const cityStore = useCityStore()

const routes: RouteRecordRaw[] = [
  {
    path: "",
    name: "首页",
    redirect: { name: "我发布的房源", params: { cityAbbr: "bj" } },
  },
  {
    path: "/:cityAbbr",
    name: "城市首页",
    props: true,
    redirect: { name: "我发布的房源", params: { cityAbbr: cityStore.abbr } },
    children: [],
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
        path: "/:cityAbbr/zufang/list",
        name: "房源列表",
        component: () => import("@/view/for-rent/list.vue"),
        props: true,
        // 路由守卫
        beforeEnter: (to) => {
          // 如果路由的城市缩写不在城市缩写的集合中，则重定向到404页面
          const cityAbbrParam = Array.isArray(to.params.cityAbbr)
            ? to.params.cityAbbr[0]
            : to.params.cityAbbr
          if (!availableCityAbbr.has(cityAbbrParam)) {
            return { name: "未找到" }
          }
          return true
        },
      },
      {
        path: "/:cityAbbr/zufang/publish",
        name: "发布房源",
        props: true,
        component: () => import("@/view/for-rent/publish.vue"),
        meta: {
          needLogin: true,
        },
      },
      {
        path: "/:cityAbbr/zufang/detail/:id",
        name: "房源详情",
        component: () => import("@/view/for-rent/detail.vue"),
        // 路由参数默认是string类型，需要转换成number类型，便于在组件中使用
        props: (route) => ({
          id: Number(route.params.id),
          cityAbbr: route.params.cityAbbr,
        }),
      },
      {
        path: ":cityAbbr/zufang/update/:id",
        name: "修改房源",
        component: () => import("@/view/for-rent/update.vue"),
        // 路由参数默认是string类型，需要转换成number类型，便于在组件中使用
        props: (route) => ({
          id: Number(route.params.id),
          cityAbbr: route.params.cityAbbr,
        }),
        meta: {
          needLogin: true,
        },
      },
    ],
  },
  {
    path: "",
    name: "个人中心",
    children: [
      {
        path: "/:cityAbbr/center/published",
        name: "我发布的房源",
        component: () => import("@/view/for-rent/published.vue"),
        props: true,
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
