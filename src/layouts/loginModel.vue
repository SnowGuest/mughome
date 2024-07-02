
<script lang="ts" setup>
import { login } from '@/apis/account';

const open = ref(false);
export interface API {
    showModel: () => void
}
const form = reactive({
    account: "",
    password: "",
    isRemember: true
})
defineExpose<API>({
    showModel() {
        open.value = true
    }
})
async function submit() {
    try {
        const result = await login(form);
        console.log(result)
    } catch (error) {

    }
}
</script>
<template>
    <a-modal v-model:open="open" title="登录/注册" :footer="null">
        <a-form :model="form" @submit="submit">
            <a-form-item name="account">
                <a-input v-model:value="form.account" placeholder="用户名/邮箱"></a-input>
            </a-form-item>
            <a-form-item name="password">
                <a-input v-model:value="form.password" placeholder="密码" type="password"></a-input>
            </a-form-item>
            <a-form-item>
                <a-button type="primary" block html-type="submit">登录/注册</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>


<style scoped></style>