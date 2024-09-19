<script lang="ts" setup>
import { useUserStore } from '@/stores/users';
import { getColor } from '@/utils';
import { storeToRefs } from 'pinia';

const props = defineProps<{
    createdUserId: number;
    padding?: string;
}>()
const { userMap } = storeToRefs(useUserStore());
const user = computed(() => userMap.value.get(props.createdUserId))
const color = ref("");
if (!user.value?.avatarUrl && user.value) {
    color.value = getColor(user.value.nickName)
}
</script>

<template>
    <a-avatar v-if="user?.avatarUrl" :src="user.avatarUrl" :size="48"  />
    <div v-else class="avatar">{{ user?.nickName[0] }}</div>
</template>


<style lang="less" scoped>
.avatar{
    width: 46px;
    height: 46px;
    background-color: v-bind(color);
    color: #fff;
    font-size: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
}
</style>