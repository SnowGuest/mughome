<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'
const loading = ref<HTMLDivElement>();
const emits = defineEmits<{
    load: []
}>()
const { stop } = useIntersectionObserver(
    loading,
    ([{ isIntersecting }], observerElement) => {
        if(isIntersecting) emits("load")
    },
)
</script>

<template>
    <div class="loading" ref="loading">
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<style scoped>
.loading,
.loading>div {
    position: relative;
    box-sizing: border-box;
}

.loading {
    display: block;
    font-size: 0;
    color: #000;
    margin: 20px auto;
}

.loading.la-dark {
    color: #333;
}

.loading>div {
    display: inline-block;
    float: none;
    background-color: currentColor;
    border: 0 solid currentColor;
}

.loading {
    width: 54px;
    height: 18px;
}

.loading>div {
    width: 10px;
    height: 10px;
    margin: 4px;
    border-radius: 100%;
    animation: ball-beat 0.7s -0.15s infinite linear;
}

.loading>div:nth-child(2n-1) {
    animation-delay: -0.5s;
}

@keyframes ball-beat {
    50% {
        opacity: 0.2;
        transform: scale(0.75);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}
</style>