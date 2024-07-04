<script lang="ts" setup>
import { message } from 'ant-design-vue';
import localforage from 'localforage'
import { login } from '../apis/account'
import { useAppStore } from "../stores/app"
const appStore = useAppStore()
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
    const result = await login(form);
    appStore.token = result.data.token;
    appStore.userInfo = result.data.user;
    localforage.setItem("userInfo", result.data.user);
    localforage.setItem("token", result.data.token);
    message.success("登录成功")
    setTimeout(() => {
        location.href = location.origin
    }, 1000)

}
</script>
<template>
    <a-modal v-model:open="open" title="登录" :footer="null">
        <a-form :model="form" @submit="submit" class="form" size="large">
            <a-form-item name="account">
                <a-input v-model:value="form.account" placeholder="用户名/邮箱"></a-input>
            </a-form-item>
            <a-form-item name="password" no-style>
                <a-input v-model:value="form.password" placeholder="密码" type="password"></a-input>
            </a-form-item>
            <div style="padding:6px 0;" class="flex justify-end">
                <a-button type="link" style="font-size:12px;">忘记密码</a-button>
            </div>
            <a-form-item>
                <a-button size="large" type="primary" block html-type="submit" style="">登录</a-button>
                <div class="flex justify-center">
                    <a-button type="link" size="large" @click="$router.push('/account/signup')">注册账号</a-button>
                </div>
            </a-form-item>
        </a-form>
    </a-modal>
</template>


<style scoped>
.form {
    padding: 80px 0 10px;
}
</style>