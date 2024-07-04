<!--  -->
<script lang="ts" setup>
import { useAppStore } from '@/stores/app';

defineProps<{
    data: Map<string | number, Monf>
}>()
const appStore = useAppStore()

</script>

<template>
    <div v-for="[key, item] in data" :key="key" class="monf">{{ item.teamName }}</div>
</template>

<style scoped>
.monf {
    background-color: #ffffff;
    margin-bottom: 10px;
}
</style>