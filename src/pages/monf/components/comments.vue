<template>
    <div class="comments container" v-if="!loading && monf">

        <div class="container-body">
            <div class="container-footer flex items-center">
                <div v-if="!appStore.isSelf(monf.createdUserId)" class="control control-like"
                    :class="{ like: monf.relations?.isLiked }" @click.stop="monf?.relations?.isLiked ? unLike() : like()">
                    <i class="bi bi-heart-fill"></i>
                    {{ monf.likeCount }}
                </div>
                <monfButton @click="commentModalInst?.open"> {{ competition?.status === "start" ? '打分' : "评论" }}
                </monfButton>
                <div class="footerList">
                    音乐打分人数：{{ monf.musicScoreCount }}
                    谱面打分人数：{{ monf.chartScoreCount }}
                </div>

            </div>
            <ul class="commentCard flex flex-col">
                <li v-for="(item, index) in data" class="comment flex" :key="item.id">
                    <div>
                        <userAvatar  :created-user-id="item.createdUserId" />
                        <!-- <UseHead :created-user-id="item.createdUserId" /> -->
                        <!-- <a-avatar :src="userMap.get(item.createdUserId)?.avatarUrl" :size="45"></a-avatar> -->
                    </div>
                    <div class="commentBody flex-1">
                        <div class="commentNickname">{{ userMap.get(item.createdUserId)?.nickName }}</div>
                        <div class="commentBio">{{ userMap.get(item.createdUserId)?.bio }}</div>
                        <CommentVote @updateComment="e => updateComment(index, e)" v-if="showVote(item)"
                            :commentId="item.id" :vote="item" />
                        <div class="commentContent">{{ item.comment }}</div>
                        <div class="commentControl flex items-center" :id="`commentControl${item.id}`">
                            <div v-if="!appStore.isSelf(item.createdUserId)" class="comment-control control-like"
                                :class="{ like: item.relations?.isLiked }"
                                @click.stop="item?.relations?.isLiked ? unCommentLike(item) : commmentLike(item)">
                                <i class="bi bi-heart-fill"></i>
                                {{ item.likeCount }}
                            </div>
                            <time class="time">发布于 {{ getCreateTime(item.createdDate) }}</time>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="endText">已经到底了~</div>
        </div>

    </div>
    <CommentModal ref="commentModalInst" :update="editComment" :monfId="monf?.id"
        :myWorkId="monf?.relations?.scoredCommentId" />
</template>

<script lang="ts" setup>


import { getMonfComments, monfLike, monfunLike, monfCommentunLike, monfCommentLike } from '@/apis/monf';
import { useUserStore } from '@/stores/users';
import dayjs from 'dayjs/esm';
import { storeToRefs } from 'pinia';
import CommentVote from './commentVote.vue';
import { useAppStore } from '@/stores/app';
import { message } from 'ant-design-vue';
import { useCompetition, type Competition } from '@/stores/competition';
import userAvatar from "@/components/userAvatar.vue"
import CommentModal from './commentModal.vue';
const commentModalInst = ref<{ open: () => void }>()
const monf = defineModel<Monf>()
const appStore = useAppStore();
const userStore = useUserStore();
const { userMap } = storeToRefs(userStore);
const competitions = useCompetition()

const competition = computed<Competition | undefined>(() => {
    return competitions.getCompetition(Array.isArray(route.params.time) ? route.params.time.join("") : route.params.time, 'monf')
})
const route = useRoute();
const loading = ref(false);
const workId = Array.isArray(route.params.id) ? route.params.id.join(",") : route.params.id;
const data = ref<MonfComment[]>([])
async function loadMonfComment() {
    const result = await getMonfComments({ workId });
    userStore.setUsers(result.data.includes.users);
    data.value = result.data.workComments
}
loadMonfComment();
const editComment = computed<boolean>(e => {
    return typeof monf.value?.relations?.scoredCommentId === "number"

})

function updateComment(i: number, newComment: MonfComment) {
    data.value.splice(i, 1, newComment)
}
function showVote(comment: MonfComment) {
    return typeof comment.chartScore === 'number' || typeof comment.musicScore === 'number'
}
function getCreateTime(time: string) {
    return dayjs(dayjs()).diff(time, "hour") > 12 ? dayjs(time).format("YYYY/MM/DD HH:mm") : dayjs(time).fromNow();
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

async function unCommentLike(item: MonfComment) {
    if (!item) return
    await monfCommentunLike(item.id);
    if (item.relations) {
        item.relations.isLiked = false
    }
    if (item.likeCount > 0) item.likeCount--
    message.info("取消点赞")
}

async function commmentLike(item: MonfComment) {
    if (!item) return
    await monfCommentLike(item.id)
    item.likeCount++
    if (item.relations) {
        item.relations.isLiked = true
    }
    message.success("点赞成功")
}






</script>
<style lang="less" scoped>
.commentCard {
    padding: 12px 16px;
    row-gap: 16px;
    min-height: 500px;

    .commentBody {
        margin-left: 14px;
    }

    .commentNickname {
        font-size: 14px;
        font-weight: 500;
        padding-top: 6px;
        padding-bottom: 3px;
    }

    .commentBio {
        margin-bottom: 6px;
        font-size: 12px;
        color: #ccc;
    }

    .commentContent {
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        word-break: break-all;
        padding-top: 12px;

    }

    .time {
        font-size: 12px;
        color: #aaa;
        display: block;
        margin-left: auto;
    }
}

.commentControl {
    margin-top: 12px;
}

.comments {
    min-height: 300px;
    padding: 12px 0;
    background-color: #fff;
    margin-top: 20px;
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

.comment-control {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    width: 50px;
    height: 24px;
    margin-right: 10px;
    background-color: #ddd;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
    color: #5A5A5A;

    i {
        font-size: 10px;
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


.container-body {
    max-width: 100%;
    width: 690px;
    margin: 0 auto;
}

.container-footer {
    position: sticky;
    bottom: 0;
    height: 50px;
    padding: 0 20px;
    column-gap: 14px;
    // background-color: #F9F7F8;
    border-bottom: 1px solid #dddddd;
}

.endText {
    text-align: center;
    font-size: 12px;
    padding: 8px 0;
    color: #999;
}

.footerList {
    color: #aaa;
    font-size: 12px;
    text-align: end;
    padding: 12px 0;
    margin-left: auto;
}
</style>