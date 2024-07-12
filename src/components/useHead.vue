<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { useUserStore } from '@/stores/users';
import { followUserApi, getUser, unfollowUserApi } from '@/apis/user';
import { message } from 'ant-design-vue';
const props = defineProps<{
    createdUserId: number;
    padding?: string;
}>()
const { userMap } = storeToRefs(useUserStore());
const user = computed(() => userMap.value.get(props.createdUserId))
async function subscribed(userId?: User["id"], bool?: boolean) {
    try {
        console.log(userId, bool, typeof bool !== "boolean", !userId)
        if (typeof bool !== "boolean" || !userId) return;
        if (bool) await followUserApi(userId)
        else await unfollowUserApi(userId)
    } catch (error) {
        console.log(error)
    }

}

</script>

<template>
    <div v-if="user" class="useHead flex items-center" :style="padding ? { padding } : {}">
        <a-avatar :src="user.avatarUrl" :size="48" class="avatar" />
        <div class="mr-a">
            <div class="nickName">{{ user.nickName }}</div>
        </div>
        <a-button v-if="user.relations?.isSubscribed" @click="subscribed(user?.id, false)">取消关注</a-button>
        <a-button class="follow" v-else @click="subscribed(user?.id, true)">关注</a-button>

    </div>
</template>

<style scoped lang="less">
.useHead {
    padding: 16px 22px;

    .avatar {
        margin-right: 10px;
    }

    .nickName {
        font-size: 14px;
        color: #212121;
        margin-bottom: 8px;
    }

    .follow {
        border-radius: 32px;
    }
}
</style>