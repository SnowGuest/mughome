<!--  -->
<script lang="ts" setup>
import { getMonf } from '@/apis/monf';
import UseHead from '@/components/useHead.vue';
import { message } from 'ant-design-vue';
const route = useRoute()
const router = useRouter()
const monf = ref<Monf>()
const loading = ref(true)
async function loadMonf(id: string) {
    try {
        const result = await getMonf(id);
        monf.value = result.data.work
    } finally {
        loading.value = false
    }

}
if (typeof route.params.id === "string") {
    loadMonf(route.params.id)
} else {
    router.replace("/noPage")
}

</script>

<template>
    <a-page-header title="返回" @back=" $router.back" />
    <div class="skeleton" v-show="loading">
        <a-skeleton active />
    </div>
    <div class="container" v-if="!loading && monf">
        <div class="container-body">
            <h2>{{ monf?.songName }}</h2>
            <UseHead :createdUserId="monf.createdUserId" />
        </div>
    </div>
</template>

<style scoped lang="less">
.container {
    padding: 0 14px;

    &-body {
        max-width: 100%;
        width: 690px;
        margin: 0 auto;
    }
}
</style>