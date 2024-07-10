<!--  -->
<script lang="ts" setup>
import { getPosts } from '@/apis/post';
import { getMonfs } from "@/apis/monf"
import Loading from '@/components/loading.vue';
import { useUserStore } from '@/stores/users';
import { usePagination } from 'alova/client';
import post from './post.vue';
import monf from './monf.vue';
const userStore = useUserStore()
const activeKey = ref("post");
let postUserId: string;
const route = useRoute();
const initLoading = ref(true)
if (typeof route.params.id === "string") postUserId = route.params.id
const {
    loading,
    data,
    isLastPage,
    page,
    reload
} = usePagination<any, (Monf | Post)[]>(
    // Method实例获取函数，它将接收page和pageSize，并返回一个Method实例
    (page, pageSize) => activeKey.value === 'post' ? getPosts({ page, pageSize, postUserId }) : getMonfs({  postUserId }),
    {
        data: response => {
            initLoading.value = false
            console.log(response, 111)
            userStore.setUsers(response.data.includes.users)
            if ("post" in response.data) {
                return response.data.post
            } else if ("works" in response.data) {
                return response.data.works

            }
        },
        append: true,
        immediate: true,
        initialPage: 1, // 初始页码，默认为1
        initialPageSize: 10 // 初始每页数据条数，默认为10
    }
);
function loadList(bool = false) {
    console.log("执行下拉加载")
    if (bool) {
        reload()
    } else {
        page.value++
    }
}
function updateItem() {

}
</script>

<template>
    <div class="leftCard">
        <div class="leftCard-header">
            <a-tabs v-model:activeKey="activeKey" @change="loadList(true)">
                <template #leftExtra>
                    <div style="width: 24px;"></div>
                </template>
                <a-tab-pane :disabled="initLoading" key="post" tab="帖子" />
                <a-tab-pane :disabled="initLoading" key="monf" tab="Monf" />
            </a-tabs>
            <div class="skeleton" v-show="initLoading">
                <a-skeleton active :loading="initLoading" />
            </div>
            <post v-if="activeKey === 'post'" v-model="data" @update="updateItem" />
            <monf v-else v-model="data" />
            <Loading v-if="!initLoading" @load="loadList()" v-show="!isLastPage" />
            <div v-if="!initLoading" class="noneContent" v-show="isLastPage">暂无更多</div>

        </div>
    </div>
</template>

<style scoped lang="less">
.noneContent {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    text-align: center;
    color: rgb(136, 136, 136);
}

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