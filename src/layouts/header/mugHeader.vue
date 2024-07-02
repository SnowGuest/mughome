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

}

/* pad长度 */
@media screen and (max-width: 1280px) {

    .pc {
        display: flex;
    }

    .mobile {
        display: none;
    }
}

/* 移动端 */
@media screen and (max-width: 768px) {

    .pc {
        display: none;
    }

    .mobile {
        display: flex;
    }
}
</style>