import { RouteRecordRaw } from 'vue-router'

const incomeRoutes: RouteRecordRaw[] = [
    {
        path: '/income',
        name: 'InCome',
        component: () => import('@/pages/InComePage.vue')
    }
]

export default incomeRoutes