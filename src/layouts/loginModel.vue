
<script lang="ts" setup>
const open = ref(false);
export interface API {
    showModel: () => void
}
defineExpose<API>({
    showModel() {
        open.value = true
    }
})
</script>
<template>
    <a-modal v-model:open="open" title="登录/注册" :footer="null">
        <a-form>
            <a-form-item>
                <a-input></a-input>
            </a-form-item>
            <a-form-item>
                <a-input></a-input>
            </a-form-item>
            <a-form-item>
                <a-button block html-type="submit">登录/注册</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>


<style scoped></style>