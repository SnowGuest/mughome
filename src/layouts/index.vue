<!--  -->
<script lang="ts" setup>
import sideBar from './sideBar.vue';
import MugHeader from './header/mugHeader.vue';
const layout = reactive<LayoutProvide>({
    open: false,
    changeSideBar(bool) {
        layout.open = bool;
    }
})
provide<LayoutProvide>("layout", layout)
</script>

<template>
    <div class="flex relative mughome flex-1">
        <sideBar />
        <div class="main">
            <MugHeader />
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped>
.mughome {
    max-height: 100%;
    width: 100%;
    height: 100%;
    --side-bar-width: 210px;
}



/* pad长度 */
@media screen and (max-width: 1280px) {

    .mughome {
        --side-bar-width: 75px;
    }
}

/* 移动端 */
@media screen and (max-width: 768px) {

    .mughome {
        --side-bar-width: 0px;
    }
}


.main {
    flex: 1;
    width: 100%;
    margin-left: var(--side-bar-width);
    height: 100%;
    background-color: #F7F7F8;
}
</style>