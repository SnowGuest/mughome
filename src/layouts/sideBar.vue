<script lang="ts" setup>
import Logo from "./logo.vue";
import MugMenu from "./mugMenu.vue";
const layout = inject<LayoutProvide>("layout")
</script>

<template>
    <section class="section" :class="{  isOpened: layout?.open === 'fullscreen'}">
        <Logo />
        <MugMenu />
    </section>
</template>

<style scoped>
/* 移动端 */
@media screen and (max-width: 768px) {

    .isOpened {
        width: 100vw !important;
        top: 60px !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
    }
}

.section {
    width: var(--side-bar-width);
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #FFFFFF;
    z-index: 2;
}
</style>