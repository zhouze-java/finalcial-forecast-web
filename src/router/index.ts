import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import familyMembersRoutes from './familyMember.js'


const routes: RouteRecordRaw[] = [
    ...familyMembersRoutes,
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