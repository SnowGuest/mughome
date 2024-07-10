<script lang="ts" setup>
import { monfLike, monfunLike } from '@/apis/monf';
import { useAppStore } from '@/stores/app';
import { message } from 'ant-design-vue';
import UseHead from '@/components/useHead.vue';
const router = useRouter();
const props = defineProps<{ item: Monf, time: string | string[] }>();
const appStore = useAppStore();
async function unLike(item: Monf) {
    await monfunLike(item.id);
    if (item.relations) {
        item.relations.isLiked = false
    }
    if (item.likeCount > 0) item.likeCount--
    message.info("取消点赞")
}

async function like(item: Monf) {
    await monfLike(item.id)
    item.likeCount++
    if (item.relations) {
        item.relations.isLiked = true
    }
    message.success("点赞成功")
}
function toDetali() {
    router.push(`/monf/${Array.isArray(props.time) ? props.time.join() : props.time}/${props.item.id}`)
}
</script>

<template>
    <div class="monf flex flex-col">
        <UseHead :createdUserId="item.createdUserId" />

        <div class="monf-body">
            <h4 class="monf-title" @click="toDetali">{{ item.songName }}</h4>
            <p class="monf-intro" @click="toDetali">{{ item.intro.length > 120 ? item.intro.slice(0, 120) + '...' :
                item.intro }}</p>
        </div>
        <div class="monf-footer flex items-center">
            <div v-if="!appStore.isSelf(item.createdUserId)" class="control control-like"
                :class="{ like: item.relations?.isLiked }"
                @click.stop="item.relations?.isLiked ? unLike(item) : like(item)">
                <i class="bi bi-heart-fill"></i>
                {{ item.likeCount }}
            </div>
            <div style="margin: 0 auto;"></div>
            <span class="monf-pepole mr-2">谱面评分人数 : {{ item.chartScoreCount }}</span>
            <span class="monf-pepole">音乐评分人数 : {{ item.musicScoreCount }}</span>
        </div>
    </div>
</template>

<style scoped lang="less">
.monf {
    background-color: #ffffff;
    min-height: 240px;
    border-radius: 4px;

    &-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 14px;
        cursor: pointer;
    }

    &-pepole {
        color: #aaa;
        font-size: 12px;
    }

    &-intro {
        line-height: 22px;
        font-size: 14px;
        color: #999;
        cursor: pointer;
        word-break: break-word;
    }
}

.monf-body {
    padding: 0 16px 16px;

}

.monf-footer {
    margin-top: auto;
    padding: 16px;
}

.control {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    width: 70px;
    height: 30px;
    background-color: #F6F6F6;
    font-weight: bold;
    font-size: 17px;
    margin-right: 14px;
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