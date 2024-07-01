<script lang="ts" setup>
import { preloadAppConf } from './utils/index';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import enUS from 'ant-design-vue/es/locale/en_US';
import { useAppStore } from './stores/app';
const appStore = useAppStore();

// 在这里管理全局动态变量
const app = reactive({
    loading: false
});
provide("app", app)

const { showView } = preloadAppConf()
const dayjsKv = {
    "zh-cn": zhCN,
    "en": enUS
}
const locale = computed(e => { dayjsKv[appStore.language] })
</script>

<template>
    <a-config-provider :locale="locale">
        <router-view></router-view>
    </a-config-provider>
</template>

