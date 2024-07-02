<script lang="ts" setup>
import lineVue from "@/components/line.vue"
const route = useRoute()
const router = useRouter()
const layout = inject<LayoutProvide>("layout")
const props = defineProps<{
    tab: Tab
}>()
function toPage() {
    if (props.tab.path) router.push(props.tab.path);
    const mql = window.matchMedia("(max-width:768px)");
    if (mql) {
        layout?.changeSideBar("close")
    }
}

const menuItemRenderClass = computed(e => ({
    isActive: route.path === props.tab.path,
    "menuItem-window": layout?.open === "opened",
    "menuItem-mobile": layout?.open === "fullscreen",
}))
</script>

<template>
    <lineVue v-if="tab.type == 'line'" />
    <li v-else class="menuItem" @click="toPage" :class="menuItemRenderClass">
        <i v-show="tab.icon" class="menuItem-icon" :class="tab.icon"></i>
        {{ tab.label }}
    </li>
</template>

<style scoped lang="less">
.menuItem {
    display: flex;
    flex-direction: column;
    padding: 8px 0;
    font-size: 14px;
    text-align: center;
    cursor: pointer;

    &-icon {
        margin-bottom: 12px;
    }

    &:hover {
        background-color: #f7f7f7;
    }
}

.isActive {
    background-color: #EAECEF;
}

.menuItem-window {
    flex-direction: row;
    padding: 16px 24px;
    align-items: center;

    .menuItem-icon {
        margin-bottom: 0;
        margin-right: 12px;
    }
}

.menuItem-mobile {
    flex-direction: row;
    align-items: center;
    height: 60px;
    padding: 8px 24px;
    font-size: 16px;

    .menuItem-icon {
        margin-bottom: 0;
        margin-right: 12px;
    }
}

@media screen and (max-width: 768px) {}
</style>