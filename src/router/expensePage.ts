import { RouteRecordRaw } from 'vue-router'

const expenseRoutes: RouteRecordRaw[] = [
    {
        path: '/expense',
        name: 'Expense',
        component: () => import('@/pages/ExpensePage.vue')
    }
]

export default expenseRoutes