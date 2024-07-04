<script lang="ts" setup>
import { getPosts } from '@/apis/post';
import { followUserApi, getUser, unfollowUserApi } from '@/apis/user';
import lineVue from '@/components/line.vue';
import Loading from '@/components/loading.vue';
import { useAppStore } from '@/stores/app';
import Monf from './components/monf.vue';
import Post from './components/post.vue';
import { getMonfs } from '@/apis/monf';
import { useUserStore } from '@/stores/users';
const loadMode = ref("loading");
const appStore = useAppStore()
const userStore = useUserStore()
const route = useRoute();
const user = ref<User>();
const activeKey = ref("post");
const searchParams = reactive({
    page: 0,
    pageSize: 20
})
const tabs = ref([{
    key: "post",
    label: "帖子",
    data: new Map<string | number, Post>()
}, {
    key: "Monf",
    label: "Monf",
    data: new Map<string | number, Monf>()
}] as const)
async function loadUserInfo(id: string) {
    try {
        let time = Date.now();
        const result = await getUser(id);
        time = 2000 - (Date.now() - time);
        console.log(result, 'xxxxxxxxxxxxxx')
        const backFn = () => {
            user.value = result.data;
            loadMode.value = "success"
        }
        time > 0 ? setTimeout(backFn, time) : backFn()
    } catch (error) {
        console.log(error)
        loadMode.value = "error"
    }
}
console.log(route.params.id)
if (typeof route.params.id === 'string') loadUserInfo(route.params.id);
else loadMode.value = "error";
const isSelf = typeof route.params.id === 'string' ? appStore.isSelf(route.params.id) : false
async function loadList(reset = false) {
    if (reset) {
        searchParams.page = 1
    } else {
        searchParams.page++
    }
    await nextTick();
    const active = activeKey.value;
    if (active === "post") {
        const result = (await getPosts({
            postUserId: user.value?.id,
            ...searchParams
        })).data
        result.post.forEach(e => tabs.value[0].data.set(e.id, e));
        userStore.setUsers(result.includes.users)
    } else {
        const result = (await getMonfs({
            postUserId: user.value?.id,
            ...searchParams
        })).data
        result.works.forEach(e => tabs.value[1].data.set(e.id, e))
        userStore.setUsers(result.includes.users)
    }
}

function subscribed(userId?: User["id"], bool?: boolean) {
    if (typeof bool !== "boolean" || !userId) return;
    if (bool) followUserApi(userId)
    else unfollowUserApi(userId)
}
</script>

<template>
    <div class="userError" v-if="loadMode === 'error'">
        <a-result status="500" title="查无此用户" sub-title="也许是你的链接有误">
            <template #extra>
                <router-link to="/">
                    <a-button type="primary" size="small">返回首页</a-button>
                </router-link>
            </template>
        </a-result>
    </div>
    <div class="flex justify-center user" v-else>
        <div class="leftCard">
            <div class="skeleton" v-show="loadMode === 'loading'">
                <a-skeleton active :loading="loadMode === 'loading'" />
            </div>
            <div class="leftCard-header">
                <a-tabs v-model:activeKey="activeKey" v-if="loadMode === 'success'" @change="loadList(true)">
                    <template #leftExtra>
                        <div style="width: 24px;"></div>
                    </template>
                    <a-tab-pane v-for="tab in tabs" :key="tab.key" :tab="tab.label">

                        <Post v-if="tab.key === 'post'" v-model="tabs[0].data" />
                        <Monf v-else v-model:data="tab.data" />

                        <Loading @load="loadList" />
                    </a-tab-pane>
                </a-tabs>
            </div>
        </div>
        <div>
            <div class="card flex flex-col rightCard" v-if="loadMode === 'success'">
                <div class="flex-center flex-col" style="padding: 30px 0 20px;">
                    <a-avatar :size="128" :src="user?.avatarUrl"></a-avatar>
                    <div class="username">{{ user?.nickName }}</div>
                    <div class="joinDate">{{ user?.createdDate }}</div>
                </div>
                <lineVue></lineVue>
                <div class="flex justify-around" style="padding:20px 0">
                    <div class="flex-center flex-col">
                        <div class="cardFooterLabel">已关注</div>
                        <div class="cardFooterNum">1919</div>
                    </div>
                    <div class="flex-center flex-col">
                        <div class="cardFooterLabel">被关注</div>
                        <div class="cardFooterNum">114514</div>
                    </div>
                </div>
                <lineVue></lineVue>
                <div style="padding: 20px 20px 30px;" v-if="!isSelf">

                    <a-button block type="primary" v-if="!user?.relations?.isSubscribed"
                        @click="subscribed(user?.id, true)">关注</a-button>
                    <a-button block v-else @click="subscribed(user?.id, false)">取消关注</a-button>
                </div>
                <div style="padding: 20px 20px 30px;" v-else>
                    <router-link to="/setting">
                        <a-button block>编辑资料</a-button>
                    </router-link>
                </div>
            </div>
            <div class="skeleton card flex flex-col flex-center" v-else-if="loadMode === 'loading'"
                style="padding: 30px 0 20px;">
                <a-skeleton-avatar :loading="loadMode === 'loading'" active :size="128" shape="circle"
                    style="margin-bottom: 12px;" />
                <a-skeleton-button :loading="loadMode === 'loading'" size="24" active style="margin-bottom: 12px;" />
                <a-skeleton-button :loading="loadMode === 'loading'" size="12" active style="margin-bottom: 24px;" />

                <lineVue></lineVue>
                <div class="flex justify-around w[100%]" style="padding:20px 0">
                    <a-skeleton-button :loading="loadMode === 'loading'" size="24" active />
                    <a-skeleton-button :loading="loadMode === 'loading'" size="24" active />
                </div>
                <lineVue></lineVue>
                <a-skeleton-button active block style="padding: 20px 20px 10px;" />
            </div>
        </div>
    </div>

</template>

<style scoped lang="less">
.card {
    /* width: 320px; */
    background-color: #ffffff;
    border-radius: 12px;
}

.username {
    font-size: 22px;
    font-weight: bold;
    margin: 14px 0 6px;
}

.joinDate {
    font-size: 12px;
    font-weight: 400;
}

.cardFooterLabel {
    font-size: 12px;
    margin-bottom: 6px;
}

.cardFooterNum {
    font-size: 20px;
    font-weight: bold;
}

.userError {
    width: 1000px;
    max-width: 100%;
    padding: 0 16px;
    margin: 0 auto;
}

.user {
    width: 1000px;
    max-width: 100%;
    padding: 50px 16px 0;
    display: grid;
    column-gap: 20px;
    grid-template-columns: minmax(0, 1fr) minmax(250px, 34%);
    margin: 0 auto;
}

.leftCard {
    /* background-color: #ffffff; */
    border-radius: 12px;

    /* padding: 12px 0; */
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

.rightCard {
    position: sticky;
    top: 16px;
}

@media screen and (max-width:768px) {
    .user {
        display: flex;
        padding: 0px 16px 0 !important;
        flex-direction: column-reverse;
    }
}
</style>followUserApi, , unfollowUserApi