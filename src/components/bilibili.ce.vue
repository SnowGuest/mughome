<template>
    <iframe class="bilibili" :src="src" style="  width: 100%;
    height: 400px;
    max-width: 100vw;
    margin: 0 auto;">
    </iframe>
</template>

<script lang="ts" setup>
interface Props {
    bvid?: string;
    avid?: string;
}

const props = defineProps<Props>();
const src = computed(() => {
    const params: string[] = [];
    if (props.avid) {
        params.push(`aid=${props.avid}`)
    }
    if (props.bvid) {
        params.push(`bvid=${props.bvid}`)
    }
    return `//player.bilibili.com/player.html?${params.join("&")}&danmaku=0&as_wide=1&high_quality=1`
})
</script>
<style scoped lang="less">
.bilibili {}
</style>