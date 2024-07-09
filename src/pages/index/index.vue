<!--  -->
<script lang="ts" setup>
import { getBanners } from '@/apis/pages';
import { getPosts } from '@/apis/post';
import { useUserStore } from '@/stores/users';
import { usePagination } from 'alova/client';
import useHead from './components/useHead.vue';
import postBody from './components/postBody.vue';
import { useAppStore } from '@/stores/app';

import { Waterfall } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'
const userStore = useUserStore()
const appStore = useAppStore()
const layout = inject<LayoutProvide>("layout");
const banners = ref<Banner[]>([])
async function loadBanner() {
    const result = await getBanners();
    banners.value = result.data
}
loadBanner();
const initLoading = ref(true)
const {
    loading,
    data,
    isLastPage,
    page,
    reload
} = usePagination<any, Post[]>(
    // Method实例获取函数，它将接收page和pageSize，并返回一个Method实例
    (page, pageSize) => getPosts({ page, pageSize }),
    {
        data: response => {
            userStore.setUsers(response.data.includes.users);
            initLoading.value = false
            return response.data.post
        },
        append: true,
        immediate: true,
        initialPage: 1, // 初始页码，默认为1
        initialPageSize: 24 // 初始每页数据条数，默认为10
    }
);
loadBanner();
let macyInstance;
onMounted(() => {
    console.log("执行")
    // macyInstance = Macy({
    //     container: '.posts',
    //     margin: {
    //         x: 8,
    //         y: 8
    //     },
    //     breakAt: {
    //         1250: { columns: 3 },
    //         1000: { columns: 2 },
    //         700: { columns: 1 },
    //     },
    //     cancelLegacy: true,
    // });
})
const breakpoints = {
    1250: { rowPerView: 3 },
    1000: { rowPerView: 2 },
    700: { rowPerView: 1 },
}
</script>

<template>
    <div class="container">
        <a-carousel v-if="banners.length > 0">
            <div v-for="item in banners">
                <img :src="item.imageUrl" :alt="item.description" />
            </div>
        </a-carousel>
        <h3 class="title">文章</h3>
        <div style="padding: 16px 0;" v-show="loading">
            <a-skeleton active v-show="loading" />
        </div>

        <Waterfall backgroundColor="transparent" :list="data" :breakpoints="breakpoints" :crossOrigin="false"
            imgSelector="headerImage" :gutter="14" :animationDelay="0" :animationDuration="0" :posDuration="0">
            <template #item="{ item, url, index }">
                <div class="post flex flex-col">
                    <useHead :createdUserId="item.createdUserId" />
                    <postBody :item="item" :url="url" />
                </div>
            </template>
        </Waterfall>
        <Loading v-if="!initLoading" @load="page++" v-show="!isLastPage" />
    </div>
    <!-- <div>首页{{ layout?.open }}</div>
    <router-link to="/user/1">去user页面</router-link>
    <router-link to="/setting">去设置页面（先登录）</router-link>
    <router-link to="/search">去搜索页面（移动端）</router-link>
    <router-link to="/account/signin">去登录页面</router-link> -->
</template>

<style scoped lang='less'>
.container {
    margin: 0 auto;
    padding: 0 16px;

    :deep(.fadeIn) {
        animation-name: none !important;
    }
}

.posts {
    width: 100%;
    min-height: 50vh;
}

.post {
    background-color: #ffffff;
    min-height: 280px;
    border-radius: 12px;

    &-body {
        padding: 0 14px;
    }

    &-title {
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
    }
}

.title {
    padding: 8px;
}
</style>