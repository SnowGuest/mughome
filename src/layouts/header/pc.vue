<!--  -->
<script lang="ts" setup>
import { useAppStore } from '@/stores/app';

const appStore = useAppStore()
const layout = inject<LayoutProvide>("layout")
const searchValue = ref("");
function onSearch() {
}

function changeSideBar() {
    console.log(layout?.open)
    if (layout?.open === "opened") {
        layout?.changeSideBar("small")
    } else if (layout?.open === "small") {
        layout?.changeSideBar("opened")
    }
}
</script>

<template>
    <div class="pcHeader flex items-center">
        <div class="collectMenu flex-center" @click="changeSideBar">
            <i class="bi bi-list"></i>
        </div>
        <div class="flex items-center search">
            <a-input-search v-model:value="searchValue" @search="onSearch" />
        </div>
        <a-popover placement="bottom">
            <template #content>
                <div class="flex" style="column-gap: 6px;">
                    <router-link to="/create" class="popoverItem">
                        <i class="bi bi-file-earmark-richtext-fill"></i>
                        文章
                    </router-link>
                    <router-link to="/create/monf" class="popoverItem">
                        <i class="bi bi-card-heading"></i>
                        monf
                    </router-link>
                    <router-link to="/create/bof" class="popoverItem">
                        <i class="bi bi-credit-card-2-front-fill"></i>
                        bof
                    </router-link>
                </div>
            </template>
            <button class="contribute">投稿</button>
        </a-popover>
        <a-popover placement="bottomRight">
            <template #content v-if="!appStore.signin">
                <a-row :gutter="[24, 4]">
                    <a-col :span="12">
                        <p>关注喜欢的作者</p>
                    </a-col>
                    <a-col :span="12">
                        <p>发布内容/评论</p>
                    </a-col>
                    <a-col :span="12">
                        <p>发布内容/评论</p>
                    </a-col>
                    <a-col :span="12">
                        <p>发布内容/评论</p>
                    </a-col>
                </a-row>
                <a-button style="margin-top: 12px;" type="primary" size="large" block
                    @click="layout?.showloginMode">登录/注册</a-button>
            </template>
            <template #content v-else>
                <div class="flex flex-col">
                    <router-link :to="`/user/${appStore.userInfo.id}`" class="menuItem">个人中心</router-link>
                    <router-link to="/setting" class="menuItem">设置</router-link>
                    <div class="menuItem" @click="appStore.loginOut">退出</div>
                </div>
            </template>
            <template #title v-if="!appStore.signin">
                <h3>登录音柚窝你可以:</h3>
            </template>
            <a-avatar :size="36">
                <template #icon>
                    <!-- <UserOutlined /> -->
                </template>
            </a-avatar>
        </a-popover>
    </div>
</template>

<style scoped lang="less">
.search {
    margin-left: 40px;
    margin-right: auto;
}

.contribute {
    height: 30px;
    border-radius: 100px;
    background-color: #212121;
    color: #ffffff;
    padding: 0 20px;
    margin-right: 14px;
}

/* pad长度 */
@media screen and (max-width: 1280px) {

    .collectMenu {
        display: none;
    }
}

.pcHeader {
    height: 100%;

    .collectMenu {
        width: 60px;
        cursor: pointer;
        font-size: 22px;
    }

    .saerch {
        height: 26px;
        outline: none;
        border: none;
    }
}

.popoverItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    cursor: pointer;
    border-radius: 12px;
    transition: all 0.21s;

    &:hover {
        background-color: #dddddd;
    }

    i {
        font-size: 22px;
    }
}

.menuItem {
    padding: 6px 10px;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.21s;
    user-select: none;

    &:hover {
        background-color: #eeeeef;
    }
}
</style>