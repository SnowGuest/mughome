<!--  -->
<script lang="ts" setup>
import sideBar from './sideBar.vue';
import MugHeader from './header/mugHeader.vue';
import LoginModel, { type API } from '@/components/loginModel.vue';
const loginModelInst = ref<API>()
const layout = reactive<LayoutProvide>({
    open: "opened",
    changeSideBar(mode) {
        layout.open = mode;

    },
    showloginMode() {
        loginModelInst.value?.showModel()
    }
})
const sideBarWidth = computed(e => {
    if (layout.open === "close") return 0
    if (layout.open === "fullscreen") return 100
    if (layout.open === "small") return 75
    if (layout.open === "opened") return 210
    return 0
})
const sideBarWidthRender = computed(_ => `${sideBarWidth.value}${sideBarWidth.value === 100 ? "vw" : "px"}`)
const mql = window.matchMedia("(max-width:768px)");
const mql2 = window.matchMedia("(max-width:1280px) and (min-width:768px)");
if (mql.matches) layout.open = "close"
if (mql2.matches) layout.open = "small"
mql.addEventListener("change", e => { if (e.matches) layout.open = "close" })
mql2.addEventListener("change", e => { if (e.matches) layout.open = "small" })
provide<LayoutProvide>("layout", layout)
</script>

<template>
    <div class=" relative mughome flex-1">
        <sideBar />
        <div class="main" :class="{ noScroll: layout.open === 'fullscreen' }">
            <MugHeader />
            <router-view></router-view>
        </div>
    </div>
    <LoginModel ref="loginModelInst" />
</template>

<style scoped lang="less">
.mughome {
    max-height: 100%;
    width: 100%;
    height: 100%;
    --side-bar-width: v-bind(sideBarWidthRender);

    &>.noScroll {
        overflow: hidden;
    }
}



@media screen and (max-width: 768px) {

    .main {
        margin-left: 0 !important;
    }
}


.main {
    margin-left: var(--side-bar-width);
    height: 100%;
    background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
    max-height: 100%;
    overflow-y: auto;
    scroll-behavior: smooth;
    position: relative;
}
</style>