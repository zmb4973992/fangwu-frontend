import type { RouteRecordRaw } from 'vue-router'

 const routes:  RouteRecordRaw[] = [
    {
        path: '/',
        name: '首页',
        redirect: { name: '租房'},
    },
    {
        path: '/zufang',
        name: '租房',
        component: () => import('@/view/for-rent.vue'),
    },
    {
        path: '/zhaofang',
        name: '找房',
        component: () => import('@/view/seek-house.vue'),
    },
]

export default routes