<!-- 更新密码 -->
<script lang="ts" setup>
import { useAppStore } from '@/stores/app';
import type { FormInstance } from 'ant-design-vue';
import { useIntervalFn } from "@vueuse/core"
const appStore = useAppStore()
const open = ref(false);
const formInst = ref<FormInstance>();

const time = ref(0)
const { pause, resume } = useIntervalFn(() => {
    time.value--
    if (time.value <= 0) {
        time.value = 0
        pause()
    }
    console.log(time)
}, 1000, { immediate: false })

const renderSendCodeText = computed(() => {
    return time.value === 0 ? '发送验证码' : `${time.value}s后重新获取`
})

const form = reactive({
    code: "",
    password: "",
    twoPassword: "",
    email: "12341241234",
});
// if (appStore.userInfo) {
//     form.email = appStore.userInfo.email
// }
async function sendCode() {
    if (time.value === 0) {
        time.value = 60
        resume()
    }
}
function submitData() {

}

defineExpose({
    show() {
        open.value = true
    }
})
</script>

<template>
    <a-modal v-model:open="open" title="修改邮箱" ref="formInst" @ok="formInst?.validate">
        <a-form :model="form" @finish="submitData">
            <a-form-item name="email" label="邮箱">
                <div> {{ form.email }}</div>
            </a-form-item>
            <a-form-item name="code">
                <a-input-search v-model:value="form.code" @search="sendCode" placeholder="请输入验证码">
                    <template #enterButton>
                        <a-button :disabled="time !== 0">{{ renderSendCodeText }}</a-button>
                    </template>
                </a-input-search>

            </a-form-item>
            <a-form-item name="password">
                <a-input v-model="form.password" placeholder="请输入新密码"></a-input>
            </a-form-item>
            <a-form-item name="twoPassword">
                <a-input v-model="form.twoPassword" placeholder="请再次输入新密码"></a-input>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<style scoped></style>