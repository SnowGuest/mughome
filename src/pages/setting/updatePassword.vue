<!-- 更新密码 -->
<script lang="ts" setup>
import type { FormInstance } from 'ant-design-vue';

const open = ref(false);
const formInst = ref<FormInstance>()
const form = ref({
    oldPassword: "",
    password: "",
    twoPassword: ""
})

function submitData() {

}

defineExpose({
    show() {
        open.value = true
    }
})
</script>

<template>
    <a-modal v-model:open="open" title="修改密码" ref="formInst" @ok="formInst?.validate">
        <a-form :model="form" @finish="submitData">
            <a-form-item name="oldPassword" label="旧密码">
                <a-input v-model="form.oldPassword"></a-input>
            </a-form-item>
            <a-form-item name="password" label="新密码">
                <a-input v-model="form.password"></a-input>
            </a-form-item>
            <a-form-item name="twoPassword" label="请再次输入新密码">
                <a-input v-model="form.twoPassword"></a-input>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<style scoped></style>