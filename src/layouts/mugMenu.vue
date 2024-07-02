<!-- 侧栏组件 -->
<script lang="ts" setup>
import menuItem from './menuItem.vue';
const tab: Tab[] = [{
    path: "/",
    label: "首页",
    icon: "bi bi-calendar2-fill",
}, {
    path: "/competition",
    label: "赛事",
    icon: "bi bi-clipboard2-data-fill",
}, {
    type: "line"
}, {
    path: "/partition",
    label: "分区",
    icon: "bi bi-microsoft",
}]
</script>

<template>
    <ul class="menu">
        <menuItem v-for="item in tab" :tab="item" v-once>
        </menuItem>
    </ul>
</template>

<style scoped>
.menu {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>