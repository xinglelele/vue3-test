<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
// 1. 动态筛选顶部一级菜单：过滤出 isMain: true 的路由（Home 的子路由）
const topRoutes = computed(() => {
    const homeRoute = router.options.routes.find(r => r.name === 'Home')
    return homeRoute?.children?.filter(r => r.isMain) || []
})

const currentMainRoute = computed(() => {
    // 匹配当前路由的第一个父级（即 animate/test 等一级路由）
    return topRoutes.value.find(r =>
        route.path.startsWith(`/${r.path}`)
    )
})
</script>

<template>
    <div class="home-layout">
        <div class="top-nav">
            <router-link v-for="route in topRoutes" :key="route.name" :to="`/${route.path}`" >
                {{ route.meta.title }}
            </router-link>
        </div>

        <div class="content-wrapper">
            <!-- 左侧二级菜单：根据当前一级路由动态生成 -->
            <div class="sidebar" v-if="currentMainRoute?.children">
                <router-link v-for="child in currentMainRoute.children" :key="child.name"
                    :to="`/${currentMainRoute.path}/${child.path}`" class="sidebar-link">
                    {{ child.meta.title }}
                </router-link>
            </div>

            <!-- 主内容区：渲染一级/二级路由组件 -->
            <div class="main-content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.home-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;

    .top-nav {
        display: flex;
        gap: 20px;
        border-bottom: 1px solid var(--nav-border-color);
        padding:0 20px;
        position: sticky;
        top: 0;
        background: var(--nav-bg);
        z-index: 10;
    }

    .content-wrapper {
        display: flex;
        flex: 1;
        width: 100%;
        overflow: hidden;

        .sidebar {
            display: flex;
            flex-direction: column;
            width: 200px;
            background: var(--nav-bg);
            padding: 20px;
            border-right: 1px solid var(--nav-border-color);
            overflow-y: auto;
        }

        .main-content {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            background-color: var(--nav-bg);
        }
    }
}

a {
    height: 3em;
    padding: 0.9em;
    line-height: 1.2em;
}

a:hover {
    color: var(--primary-color);
    background-color: var(--bg-light);
}

a.router-link-active {
    color: var(--primary-color);
    background-color: var(--bg-light);
    font-weight: 600;
    border-bottom: 2px solid var(--primary-color);
}
</style>