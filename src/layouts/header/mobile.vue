<!--  -->
<script lang="ts" setup>
const router = useRouter();
const layout = inject<LayoutProvide>("layout")
function openMenu() {
    layout?.changeSideBar("fullscreen")
}
function closeMenu() {
    layout?.changeSideBar("close")
}
function toSearch() {
    router.push("/search")
}
</script>

<template>
    <div class="mobileHeader flex items-center">
        <div class="collectMenu flex-center mr-auto" @click="openMenu" v-show="layout?.open === 'close'">
            <i class="bi bi-list"></i>
        </div>
        <div class="collectCloseMenu flex-center mr-auto" @click="closeMenu" v-show="layout?.open === 'fullscreen'">
            <i class="bi bi-x"></i>
        </div>
        {{ layout?.open }}
        <div class="collectSearch flex-center " @click="toSearch">
            <i class="bi bi-search"></i>
        </div>
    </div>
</template>

<style scoped lang="less">
.search {
    margin-left: 40px;
    margin-right: auto;
}

.collectSearch {
    width: 60px;
    cursor: pointer;
    font-size: 20px;
}
.collectCloseMenu{
    width: 60px;
    cursor: pointer;
    font-size: 30px;
}
.contribute {
    height: 30px;
    border-radius: 100px;
    background-color: #212121;
    color: #ffffff;
    padding: 0 20px;
    margin-right: 14px;
}

.mobileHeader {
    height: 100%;

    .collectMenu {
        width: 60px;
        cursor: pointer;
        font-size: 22px;
    }

    .saerch {
        height: 26px;
        outline: none;
        border: none;
    }
}
</style>