<!--  -->
<script lang="ts" setup>
const layout = inject<LayoutProvide>("layout")
</script>

<template>
    <div>首页{{ layout?.open }}</div>
    <router-link to="/user/1">去user页面</router-link>
    <router-link to="/setting">去设置页面（先登录）</router-link>
    <router-link to="/search">去搜索页面（移动端）</router-link>
    <router-link to="/account/signin">去登录页面</router-link>
</template>

<style scoped></style>