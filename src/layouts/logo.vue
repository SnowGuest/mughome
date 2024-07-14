<script lang="ts" setup>
const layout = inject<LayoutProvide>("layout")

</script>

<template>
    <div class="logo flex-center">
        <img src="@/assets/images/logo.png" alt="" width="30" height="30">
        <span class="name" v-show="layout?.open === 'opened' || layout?.open === 'fullscreen'">音柚窝</span>
    </div>
</template>

<style scoped>
.name {
    font-size: 16px;
    color: #ff6700;
    margin-left: 10px;
}

.logo {
    overflow: hidden;
    height: 60px;
}
</style>