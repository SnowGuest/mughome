
<script lang="ts" setup>
const open = ref(false);
export interface API {
    showModel: () => void
}
const form = reactive({
    account: "",
    password: ""
})
defineExpose<API>({
    showModel() {
        open.value = true
    }
})
</script>
<template>
    <a-modal v-model:open="open" title="登录/注册" :footer="null">
        <a-form :model="form">
            <a-form-item>
                <a-input v-model="form.account" placeholder="用户名/邮箱"></a-input>
            </a-form-item>
            <a-form-item>
                <a-input v-model="form.password" placeholder="密码" type="password"></a-input>
            </a-form-item>
            <a-form-item>
                <a-button block html-type="submit">登录/注册</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>


<style scoped></style>