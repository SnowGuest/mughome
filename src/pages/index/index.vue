<!--  -->
<script lang="ts" setup>
const layout = inject<LayoutProvide>("layout")
</script>

<template>
    <div>首页{{ layout?.open }}</div>
    
</template>

<style scoped></style>