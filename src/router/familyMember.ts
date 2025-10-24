import { RouteRecordRaw } from 'vue-router'

const familyRoutes: RouteRecordRaw[] = [
    {
        path: '/family-members',
        name: 'FamilyMembers',
        component: () => import('@/pages/FamilyMembers.vue')
    }
]

export default familyRoutes