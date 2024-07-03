<!--  -->
<script lang="ts" setup>
import { useAppStore } from "@/stores/app";

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
    <a-form :model="form" class="form" :label-col="{ style: { textAlign: 'left', width: '110px' } }" :colon="false">
        <a-form-item name="avatarUrl" label="头像">
            <div class="flex items-center">
                <a-avatar :size="86"></a-avatar>
                <div class="flex flex-col items-start" style="margin-left: 14px;">
                    <a-button shape="round">修改头像</a-button>
                    <span class="annotationText">图片格式支持 GIF、PNG、JPEG，小于 4 MB</span>
                </div>
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
            <a-textarea :rows="6" v-model:value="form.bio" placeholder="最多200字" />
        </a-form-item>
        <a-form-item>
            <a-button html-type="submit" type="primary">修改</a-button>
        </a-form-item>
    </a-form>
</template>

<style scoped lang="less">
.annotationText {
    font-size: 14px;
    color: #ccc;
    margin-top: 6px;
}

.form {
    :deep(.ant-form-item-label) {
        label {
            font-weight: bold;
            font-size: 16px;
        }
    }
}
</style>