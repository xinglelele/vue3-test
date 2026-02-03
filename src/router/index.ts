import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        children: [
            {
                path: 'animate',
                name: 'Animate',
                redirect: '/animate/color',
                meta: { title: '动画' },
                isMain: true,
                children: [
                    {
                        path: 'color',
                        name: 'AmimateColor',
                        component: () => import('@/views/animate/AnimateColor.vue'),
                        meta: { title: '颜色动画' },
                    },
                    {
                        path: 'move',
                        name: 'AmimateMove',
                        component: () => import('@/views/animate/AnimateMove.vue'),
                        meta: { title: '动作动画' },
                    }
                ]
            },
            {
                path: 'test',
                name: 'Test',
                component: () => import('@/views/Test.vue'),
                meta: { title: '测试' },
                isMain: true,
            },
            {
                path: 'testt',
                name: 'Testt',
                component: () => import('@/views/Testt.vue'),
                meta: { title: '测试2' },
                isMain: true,
            }
        ]
    },

]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router;