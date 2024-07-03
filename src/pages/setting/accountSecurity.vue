<!--  -->
<script lang="ts" setup>
import { useAppStore } from "@/stores/app";
import updateEmail from "./updateEmail.vue";
import updatePassword from "./updatePassword.vue";
const updateEmailInst = ref<{ show: () => void }>();
const updatePasswordInst = ref<{ show: () => void }>();
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

    <a-form class="accountSecurity" :colon="false" :label-col="{ style: { textAlign: 'left', width: '110px' } }">

        <a-form-item label="密码" class="formLabel">
            <a-button shape="round" @click="updatePasswordInst?.show()">修改</a-button>
        </a-form-item>
        <a-form-item label="邮箱" class="formLabel">
            <a-button shape="round" @click="updateEmailInst?.show()">修改</a-button>
        </a-form-item>
    </a-form>
    <updatePassword ref="updatePasswordInst" />
    <updateEmail ref="updateEmailInst" />
</template>

<style scoped lang="less">
.accountSecurity {
    padding: 24px 50px;

    :deep(.ant-form-item-label) {
        label {
            font-weight: bold;
            font-size: 16px;
        }
    }
}

.formLabel {
    width: 110px;
    font-size: 18px;
    font-weight: bold;
}
</style>