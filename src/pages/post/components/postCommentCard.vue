<template>
    <li class="comment flex" :key="comment.id"
        v-if="comment && !comment.isHidden && isChild ? true : commentIds?.has(comment.id)">
        <div :class="{isChildAvatar:isChild}">
            <a-avatar  :src="userMap.get(comment.createdUserId)?.avatarUrl" :size="isChild ? 25 : 45"></a-avatar>
        </div>
        <div class="commentBody flex-1">
            <div class="commentNickname">{{ userMap.get(comment.createdUserId)?.nickName }}
                <a-tag v-if="post" color="blue" v-show="comment.createdUserId !== post.id">作者</a-tag>

            </div>
            <div class="commentBio">{{ userMap.get(comment.createdUserId)?.bio }}</div>

            <div class="commentContent">{{ comment.content }}</div>
            <div class="commentControl flex items-center" :id="`commentControl${comment.id}`">
                <div v-if="!appStore.isSelf(comment.createdUserId)" class="comment-control control-like"
                    :class="{ like: comment.relations?.isLiked }"
                    @click.stop="comment?.relations?.isLiked ? unCommentLike(comment) : commmentLike(comment)">
                    <i class="bi bi-heart-fill"></i>
                    {{ comment.likeCount }}
                </div>
                <a-button v-if="!isChild" type="link" @click="backComment(comment)">回复</a-button>
                <time class="time">发布于 {{ getCreateTime(comment.createdDate) }}</time>
            </div>
        </div>
    </li>
    <ul class="child" v-if="Array.isArray(comment.relations?.subCommentIds) && !isChild">
        <!-- {{ Array.isArray(childComment) }} -->
        <postCommentCard :comment="item" isChild v-for="item in childComment" :key="item.id" :post="post">
        </postCommentCard>
    </ul>
</template>

<script lang="ts" setup>
import { postCommentLike } from '@/apis/post';
import { useAppStore } from '@/stores/app';
import { useUserStore } from '@/stores/users';
import { message } from 'ant-design-vue';
import dayjs from 'dayjs/esm';
import { storeToRefs } from 'pinia';
const { userMap } = storeToRefs(useUserStore())
const appStore = useAppStore();
defineOptions({
    name: 'postComment'
})
const props = defineProps<{
    comment: PostComment,
    commentIds?: Set<number>,
    commentChildMap?: Map<PostComment["id"], PostComment>,
    isChild?: boolean,
    post?: Post
}>();
const childComment = computed<PostComment[]>(e => {
    if (props.isChild) return [];
    return props.comment.relations?.subCommentIds.map(e => {
        return props.commentChildMap?.get(e)
    }).filter(e => e) as PostComment[]
})
const postComment = inject<{ showCommentModel: (e: PostComment) => void }>("postComment")
function backComment(e: PostComment) {
    postComment?.showCommentModel(e)
}

function getCreateTime(time: string) {
    return dayjs(dayjs()).diff(time, "hour") > 12 ? dayjs(time).format("YYYY/MM/DD HH:mm") : dayjs(time).fromNow();
}
/* 评论取消点赞 */
async function unCommentLike(item: PostComment) {
    if (!item) return
    await postCommentLike(item.id, true);
    if (item.relations) {
        item.relations.isLiked = false
    }
    if (item.likeCount > 0) item.likeCount--
    message.info("取消点赞")
}
/* 评论点赞 */
async function commmentLike(item: PostComment) {
    if (!item) return
    await postCommentLike(item.id, false)
    item.likeCount++
    if (item.relations) {
        item.relations.isLiked = true
    }
    message.success("点赞成功")
}
</script>
<style lang="less" scoped>
.comment {
    padding: 0 16px;

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

    .commentControl {
        margin-top: 12px;
    }

    .time {
        font-size: 12px;
        color: #aaa;
        display: block;
        margin-left: auto;
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

.child {
    padding-left: 50px;
}
.isChildAvatar{
    padding-top: 4px;
}
</style>