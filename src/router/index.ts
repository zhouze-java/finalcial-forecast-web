import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import familyMembersRoutes from '@/router/familyMember'
import incomeRoutes from "@/router/incomePage";


const routes: RouteRecordRaw[] = [
    ...familyMembersRoutes,
    ...incomeRoutes,
    {
        path: "/",
        name: "index",
        component: () => import('@/pages/Index.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/pages/NotFound.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router