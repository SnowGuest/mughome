<!--  -->
<script lang="ts" setup>
import lineVue from '@/components/line.vue';
import { followUserApi, getUser, unfollowUserApi } from '@/apis/user';
import { useAppStore } from '@/stores/app';
const emits = defineEmits<{
    error: []
}>()
const route = useRoute();
const loadMode = ref("loading");

const appStore = useAppStore()
function subscribed(userId?: User["id"], bool?: boolean) {
    if (typeof bool !== "boolean" || !userId) return;
    if (bool) followUserApi(userId)
    else unfollowUserApi(userId)
}
const user = ref<User>()
async function loadUserInfo(id: string) {
    try {
        let time = Date.now();
        const result = await getUser(id);
        time = 2000 - (Date.now() - time);
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
if (typeof route.params.id === "string") loadUserInfo(route.params.id);
else emits("error");
const isSelf = typeof route.params.id === "string" ? appStore.isSelf(route.params.id) : false

</script>

<template>
    <!-- <div> -->
        <div class="card flex flex-col rightCard " v-if="loadMode === 'success'">
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
            <a-skeleton-button :loading="loadMode === 'loading'" size="small" active style="margin-bottom: 12px;" />
            <a-skeleton-button :loading="loadMode === 'loading'" size="small" active style="margin-bottom: 24px;" />

            <lineVue></lineVue>
            <div class="flex justify-around w[100%]" style="padding:20px 0">
                <a-skeleton-button :loading="loadMode === 'loading'" size="small" active />
                <a-skeleton-button :loading="loadMode === 'loading'" size="small" active />
            </div>
            <lineVue></lineVue>
            <a-skeleton-button active block style="padding: 20px 20px 10px;" />
        </div>
    <!-- </div> -->
</template>

<style scoped lang="less">
.card {
    /* width: 320px; */
    background-color: #ffffff;
    border-radius: 12px;
    align-self: flex-start;
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
</style>