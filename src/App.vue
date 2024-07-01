<script lang="ts" setup>
import { preloadAppConf } from './utils/index';
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();
// 在这里管理全局动态变量
const app = reactive({
    loading: false
});
provide("app", app)

const { showView } = preloadAppConf()

</script>

<template>
    <a-config-provider>
        <router-view></router-view>
    </a-config-provider>
    <!-- <a-config-provider :locale="locale"> -->
    <!-- </a-config-provider> -->
    <!-- <router-view v-if="showView" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)" v-loading="app.loading"></router-view> -->
</template>

