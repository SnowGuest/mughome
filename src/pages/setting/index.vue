<script lang="ts" setup>
import { pagePermissionVerify } from "@/utils"
import UserInfoVue from "./userInfo.vue"
import AccountSecurity from "./accountSecurity.vue";
pagePermissionVerify();
const route = useRoute();
const currentTree = ref("#userinfo")
const leftTree = [
    { label: "个人信息", hash: "#userinfo", },
    { label: "账号安全", hash: "#security", },
]
watch(route, () => {
    if (route.hash) {
        currentTree.value = route.hash
    }
})
if (route.hash) {
    currentTree.value = route.hash
}
</script>

<template>
    <div class="setting-header flex">
        <h2>设置</h2>
    </div>
    <div class="setting flex">
        <div class="left">
            <a v-for="item in leftTree" :href="item.hash"
                :class="`leftItem${item.hash === currentTree ? '-current' : ''}`">{{ item.label }}</a>
            <!-- <a href="#security" class="leftItem">账号与安全</a> -->
        </div>
        <div class="right flex-1">
            <div class="card">
                <div class="title" id="userinfo">个人信息</div>
                <div class="cardBody">
                    <UserInfoVue />
                </div>
            </div>
            <div class="card">
                <div class="title" id="security">账号与安全</div>
                <AccountSecurity />
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.setting-header {
    padding: 0 16px;
    margin: 0 auto;
    max-width: 1300px;
    width: 100%;
    padding: 20px;
}

.setting {
    padding: 0 16px;
    margin: 0 auto;
    max-width: 1300px;
    width: 100%;
    height: 100%;
}

.card {
    margin-bottom: 16px;
    background-color: #ffffff;
    border-radius: 4px;
    min-height: 130px;
    overflow: hidden;

    .cardBody {
        padding: 24px 50px;
    }

    .title {
        background-color: #EEEEF2;
        padding: 12px;
        font-size: 18px;
        font-weight: bold;
    }
}

.left {
    min-width: 200px;
    background-color: #ffffff;
    border-radius: 4px;
    margin-right: 16px;
    align-self: flex-start;
    position: sticky;
    top: 16px;
    .leftItem-current {
        background-color: #EEEEF2;
    }

    .leftItem,
    .leftItem-current {
        height: 54px;
        align-items: center;
        font-weight: bold;
        font-size: 16px;
        display: flex;
        align-items: center;
        padding: 0 12px;
        cursor: pointer;
    }
}
</style>