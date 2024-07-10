<!--  -->
<script lang="ts" setup>
import { getMonf, monfLike, monfunLike } from '@/apis/monf';
import BilibiliCe from '@/components/bilibili.vue';
import UseHead from '@/components/useHead.vue';
import { useAppStore } from '@/stores/app';
import { useUserStore } from '@/stores/users';
import { message } from 'ant-design-vue';
import monfButton from "@/components/monfButton.vue"
const route = useRoute()
const router = useRouter()
const monf = ref<Monf>();
const appStore = useAppStore();
const userStore = useUserStore();
const loading = ref(true);
const openComment = ref(false)
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
    loadMonf(route.params.id)
} else {
    router.replace("/noPage")
}
async function unLike() {
    if (!monf.value) return
    await monfunLike(monf.value.id);
    if (monf.value.relations) {
        monf.value.relations.isLiked = false
    }
    if (monf.value.likeCount > 0) monf.value.likeCount--
    message.info("取消点赞")
}

async function like() {
    if (!monf.value) return
    await monfLike(monf.value.id)
    monf.value.likeCount++
    if (monf.value.relations) {
        monf.value.relations.isLiked = true
    }
    message.success("点赞成功")
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
            <div class="container-footer flex items-center">
                <div v-if="!appStore.isSelf(monf.createdUserId)" class="control control-like"
                    :class="{ like: monf.relations?.isLiked }"
                    @click.stop="monf?.relations?.isLiked ? unLike() : like()">
                    <i class="bi bi-heart-fill"></i>
                    {{ monf.likeCount }}
                </div>
                <monfButton @click="openComment = true"> 打分</monfButton>
            </div>
        </div>

    </div>
</template>

<style scoped lang="less">
.pageHeader {
    position: sticky;
    top: 0;
}

.container {
    padding: 0 14px;

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

    &-footer {
        position: sticky;
        bottom: 0;
        height: 50px;
        padding: 0 20px;
        column-gap: 14px;
        background-color: #F9F7F8;
        margin-top: 50px;
        border-top: 1px solid #dddddd;
    }
}

.control {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    width: 70px;
    height: 30px;
    background-color: #ddd;
    font-weight: bold;
    font-size: 17px;
    cursor: pointer;
    color: #5A5A5A;

    i {
        font-size: 14px;
        margin-right: 6px;
    }
}

.control-like {
    i {
        font-size: 13px;
    }
}

.like {
    background-color: #fd4c2c;
    color: #FFFFFF;
}
</style>