<script lang="ts" setup>

import PostList from './components/postList.vue';
import UserCard from './components/userCard.vue';
const loadMode = ref("loading");



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
        <PostList />
        <UserCard @error="loadMode = 'error'" />
    </div>
</template>

<style scoped lang="less">
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



@media screen and (max-width:768px) {
    .user {
        display: flex;
        padding: 0px 16px 0 !important;
        flex-direction: column-reverse;
    }
}
</style>