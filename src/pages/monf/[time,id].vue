<!--  -->
<script lang="ts" setup>
import { getMonf, getMonfComments, monfLike, monfunLike } from '@/apis/monf';
import BilibiliCe from '@/components/bilibili.ce.vue';
import UseHead from '@/components/useHead.vue';
import { useAppStore } from '@/stores/app';
import { useUserStore } from '@/stores/users';
import { message } from 'ant-design-vue';
import monfButton from "@/components/monfButton.vue"
import comments from './components/comments.vue';
const route = useRoute()
const router = useRouter()
const monf = ref<Monf>();
const appStore = useAppStore();
const userStore = useUserStore();
const loading = ref(true);
const openComment = ref(false);
const columns = [{
    title: '昵称',
    dataIndex: 'memberName',
    key: 'memberName',
}, {
    title: '职位',
    dataIndex: 'memberJob',
    key: 'memberJob',
}, {
    title: 'Malody UID',
    dataIndex: 'memberJob',
    key: 'memberJob',
},]
async function loadMonf(id: string) {
    try {
        const result = await getMonf(id);
        userStore.setUsers(result.data.includes.users);
        monf.value = result.data.work
    } finally {
        loading.value = false
    }

}

if (typeof route.params.id === "string") {
    loadMonf(route.params.id);
} else {
    router.replace("/noPage")
}





</script>

<template>
    <a-page-header title="返回" @back=" $router.back" class="pageHeader" />

    <div class="skeleton" v-show="loading">
        <a-skeleton active />
    </div>
    <div class="container" v-if="!loading && monf">
        <div class="container-body">
            <h2 class="title">{{ monf.songName }}</h2>
            <UseHead padding="0 0 20px 0" :createdUserId="monf.createdUserId" />
            <h3 class="label">团队</h3>
            <a-table :pagination="false" :dataSource="monf.members" :columns="columns" />
            <h3 class="label">歌曲简介</h3>

            <p class="intro">{{ monf.intro }}</p>
            <h3 class="label">演示</h3>
            <BilibiliCe :bvid="monf.bilibiliLink" />
            <div class="footerTags">
                <a-tag color="pink">平均分：{{ (Number(monf.chartScoreAvg) + Number(monf.musicScoreAvg)).toFixed(2) }}</a-tag>
                <a-tag color="red">总分：{{ monf.chartScoreTotal + monf.musicScoreTotal }}</a-tag>
                <a-tag color="orange">谱面平均分：{{ monf.chartScoreAvg.toFixed(2) }}</a-tag>
                <a-tag color="green">谱面总分：{{ monf.chartScoreTotal }}</a-tag>
                <a-tag color="cyan">音乐平均分：{{ monf.musicScoreAvg.toFixed(2) }}</a-tag>
                <a-tag color="blue">音乐总分：{{ monf.musicScoreTotal }}</a-tag>
            </div>
        </div>
    </div>
    <comments v-model="monf" />
</template>

<style scoped lang="less">
.pageHeader {
    position: sticky;
    top: 0;
    background-color: #FAF8F8;
    z-index: 2;
}

.container {
    padding: 0 14px;
    margin: 0 auto;

    .title {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 18px;
    }

    .label {
        padding: 12px 0;
        margin-top: 10px;
    }

    .intro {
        line-height: 24px;
        font-weight: 500;
        font-size: 16px;
        margin-top: 12px;
        max-height: 50vh;
        margin-bottom: 20px;
    }

    &-body {
        max-width: 100%;
        width: 690px;
        margin: 0 auto;
    }


}

.footerTags {
    display: flex;
    padding: 12px 0;
}

.skeleton {
    padding: 12px 20px;
}
</style>