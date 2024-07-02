<script lang="ts" setup>
import lineVue from "@/components/line.vue"
const route = useRoute()
const router = useRouter()
const props = defineProps<{
    tab: Tab
}>()
function toPage() {
    if (props.tab.path) router.push(props.tab.path)
}
</script>

<template>
    <lineVue v-if="tab.type == 'line'" />
    <li v-else class="menuItem flex flex-col" @click="toPage" :class="{ isActive: route.path === tab.path }">
        <i v-show="tab.icon" class="menuItem-icon" :class="tab.icon"></i>
        {{ tab.label }}
    </li>
</template>

<style scoped lang="less">
.menuItem {
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
</style>