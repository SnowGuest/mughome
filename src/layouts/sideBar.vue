<script lang="ts" setup>
import Logo from "./logo.vue";
import MugMenu from "./mugMenu.vue"
</script>

<template>
    <section class="section">
        <Logo />
        <MugMenu />
    </section>
</template>

<style scoped>
.section {
    width: var(--side-bar-width);
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #FFFFFF;
}
</style>