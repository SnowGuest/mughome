<!--  -->
<script lang="ts" setup>
import pc from "./pc.vue"
import mobile from "./mobile.vue"
</script>

<template>
    <header class="header">
        <pc class="pc" />
        <mobile class="mobile" />
    </header>
</template>

<style scoped lang="less">
.header {
    height: 60px;
    max-height: 60px;
    padding: 0 12px;

    .pc {
        display: flex;
    }

    .mobile {
        display: none;
    }
}

/* pad长度 */
@media screen and (max-width: 1280px) and (min-width:768px) {

    .pc {
        display: flex !important;
    }

    .mobile {
        display: none !important;
    }
}

/* 移动端 */
@media screen and (max-width: 768px) {

    .pc {
        display: none !important;
    }

    .mobile {
        display: flex !important;
    }
}
</style>