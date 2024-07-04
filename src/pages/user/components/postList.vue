<!--  -->
<script lang="ts" setup>
import { getMonfs } from '@/apis/monf';
import { getPosts } from '@/apis/post';
import { followUserApi, getUser, unfollowUserApi } from '@/apis/user';
import lineVue from '@/components/line.vue';
import Loading from '@/components/loading.vue';
import { useAppStore } from '@/stores/app';
import { useUserStore } from '@/stores/users';
import { usePagination } from 'alova/client';

const loadMode = ref("loading");
const userStore = useUserStore()
const user = ref<User>();
const activeKey = ref("post");
const searchParams = reactive({
    page: 1,
    pageSize: 20
})
const posts = new Map<string | number, Post>()
const monfs = new Map<string | number, Monf>()

// async function loadList(reset = false) {
//     if (reset) {
//         searchParams.page = 1
//     } else {yyyyyyyyyyyyy
//         searchParams.page++
//     }
//     await nextTick();
//     const active = activeKey.value;
//     if (active === "post") {
//         const result = (await getPosts({
//             postUserId: user.value?.id,
//             ...searchParams
//         })).data
//         result.post.forEach(e => tabs.value[0].data.set(e.id, e));
//         userStore.setUsers(result.includes.users)
//     } else {
//         const result = (await getMonfs({
//             postUserId: user.value?.id,
//             ...searchParams
//         })).data
//         result.works.forEach(e => tabs.value[1].data.set(e.id, e))
//         userStore.setUsers(result.includes.users)
//     }
// }


const {
    // 加载状态
    loading,

    // 列表数据
    data,

    // 是否为最后一页
    // 下拉加载时可通过此参数判断是否还需要加载
    isLastPage,

    // 当前页码，改变此页码将自动触发请求
    page,

    // 每页数据条数
    pageSize,

    // 分页页数
    pageCount,

    // 总数据量
    total
} = usePagination(
    // Method实例获取函数，它将接收page和pageSize，并返回一个Method实例
    (page, pageSize) => getPosts({ page, pageSize, postUserId: user.value?.id }),
    {

        // 请求前的初始数据（接口返回的数据格式）
        initialData: {
            total: 0,
            data: []
        },
        total: response => 0,
        data: response => response.data.post,
        append: true,
        immediate: false,
        initialPage: 0, // 初始页码，默认为1
        initialPageSize: 10 // 初始每页数据条数，默认为10
    }
);
function loadList() {
    page.value++
}
</script>

<template>
    <div class="leftCard">
        <div class="skeleton" v-show="loadMode === 'loading'">
            <a-skeleton active :loading="loadMode === 'loading'" />
        </div>
        <div class="leftCard-header">
            <a-tabs v-model:activeKey="activeKey" v-if="loadMode === 'success'" @change="loadList(true)">
                <template #leftExtra>
                    <div style="width: 24px;"></div>
                </template>
                <a-tab-pane key="post" tab="帖子" />
                <a-tab-pane key="monf" tab="Monf" />
            </a-tabs>
            <Post v-if="activeKey === 'post'" v-model="data" />
            <Post v-else v-model="data" />


            <Loading @load="loadList" />

        </div>
    </div>
</template>

<style scoped lang="less">
.leftCard {
    border-radius: 12px;

    &-header {
        border-radius: 12px;

        :deep(.ant-tabs-nav) {
            background-color: #ffffff;
            margin: 0;
            padding-bottom: 16px;
        }
    }
}

.skeleton {
    padding: 20px;
    background-color: #ffffff;
    border-radius: 12px;
}
</style>