<!--  -->
<script lang="ts" setup>
const layout = inject<LayoutProvide>("layout")
const searchValue = ref("")
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
        <button class="contribute">投稿</button>
        <a-popover placement="bottomRight">
            <template #content>
                <p>关注喜欢的作者</p>
                <p>发布内容/评论</p>
                <a-button type="primary">登录/注册</a-button>
            </template>
            <template #title>
                <span>登录MugHome你可以</span>
            </template>
            <a-avatar>
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
</style>