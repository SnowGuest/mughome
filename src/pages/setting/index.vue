<script lang="ts" setup>
import { useAppStore } from "@/stores/app";
import { pagePermissionVerify } from "@/utils"
pagePermissionVerify();
const store = useAppStore();
const form = reactive({
    avatarUrl: "",
    nickName: "",
    gender: "",
    bio: "",
})
if (store.userInfo) {
    Object.assign(form, store.userInfo)
}
</script>

<template>
    <div class="setting-header flex">
        <h2>设置</h2>
    </div>
    <div class="setting flex">
        <div class="left">
            <div class="leftItem-current">个人信息</div>
            <div class="leftItem">账号与安全</div>
        </div>
        <div class="right flex-1">
            <div class="card">
                <div class="title">个人信息</div>
                <a-form :model="form">
                    <a-form-item name="avatarUrl" label="头像">
                        <div>
                            <a-avatar></a-avatar>
                            <a-button>修改头像</a-button>
                            <span>
                                图片格式支持 GIF、PNG、JPEG，小于 4 MB
                            </span>
                        </div>
                    </a-form-item>
                    <a-form-item name="nickName" label="昵称">
                        <a-input v-model:value="form.nickName"></a-input>
                    </a-form-item>
                    <a-form-item name="gender" label="性别">
                        <a-radio-group v-model:value="form.gender" name="radioGroup">
                            <a-radio value="1">男</a-radio>
                            <a-radio value="2">女</a-radio>
                            <a-radio value="3">保密</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item name="bio" label="个人简介">
                        <a-textarea v-model:value="form.bio" placeholder="最多200字" auto-size />
                    </a-form-item>
                    <a-form-item>
                        <a-button html-type="submit">修改</a-button>
                    </a-form-item>
                </a-form>
            </div>
            <div class="card">
                <div class="title">账号与安全</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.setting-header {
    padding: 0 16px;
    margin: 0 auto;
    max-width: 1000px;
    width: 100%;
    padding: 20px;
}

.setting {
    padding: 0 16px;
    margin: 0 auto;
    max-width: 1000px;
    width: 100%;
    height: 100%;
}

.card {
    margin-bottom: 16px;
    background-color: #ffffff;
    border-radius: 4px;
    min-height: 130px;
    overflow: hidden;

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