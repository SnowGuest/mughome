<!--  -->
<script lang="ts" setup>
import { monfLike, monfunLike } from '@/apis/monf';
import { useAppStore } from '@/stores/app';
import { useUserStore } from '@/stores/users';
import { storeToRefs } from "pinia"
import { message } from "ant-design-vue"
defineModel<Monf[]>();
defineEmits<{
    update: []
}>()
const router = useRouter()
const appStore = useAppStore()
const { userMap } = storeToRefs(useUserStore());
function toDetali(post: Monf, target = "") {
    console.log(`/post/${post.id}${target}`)
    router.push({
        path: `/post/${post.id}${target}`
    })
}


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
</script>

<template>
    <article v-for="(item, i) in modelValue" :key="item.id" class="post">
        <div class="flex">
            <a-avatar @click="toDetali(item)" class="avatar" :src="userMap.get(item.createdUserId)?.avatarUrl"
                :size="38"></a-avatar>
            <div>
                <div @click="toDetali(item)" class="nickName">{{ userMap.get(item.createdUserId)?.nickName }}</div>
                <div @click="toDetali(item)" class="bio">{{ userMap.get(item.createdUserId)?.bio }}</div>
            </div>
        </div>
        <div class="postBody">
            <h4 @click="toDetali(item)" class="title">{{ item.songName }}</h4>
            <!-- <a-typography-paragraph style="cursor: pointer;" @click="toDetali" :ellipsis="{ rows: 2, expandable: false }"
                :content="item.content" /> -->
        </div>
        <div class="postFooter flex">
            <div v-if="!appStore.isSelf(item.createdUserId)" class="control control-like"
                :class="{ like: item.relations?.isLiked }" @click="item.relations?.isLiked ? unLike(item) : like(item)">
                <i class="bi bi-heart-fill"></i>
                {{ item.likeCount }}
            </div>
            <div class="control" @click="toDetali(item, '#comment')">
                <i class="bi bi-chat-dots-fill"></i>
                {{ item.chartScoreCount }}
            </div>
        </div>
    </article>
</template>

<style scoped>
.post {
    background-color: #ffffff;
    margin-bottom: 10px;
    padding: 20px 26px;
}

.avatar {
    margin-right: 10px;
}

.nickName {
    font-size: 14px;
    margin-bottom: 6px;
}

.bio {
    font-size: 12px;
    color: #ccc;
    max-width: 30vw;
    width: 200px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 12px;
    cursor: pointer;
}

.postBody {
    padding: 14px 0;
}

.postFooter {
    margin-top: 14px;
    row-gap: 14px;
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