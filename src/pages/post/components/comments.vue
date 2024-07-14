<template>
    <!-- <a href="#comments" style="pointer-events: none;" id="comments"></a> -->
    <div class="comments container" v-if="!loading && post">

        <div class="container-body">
            <div class="container-footer flex items-center">
                <div v-if="!appStore.isSelf(post.createdUserId)" class="control control-like"
                    :class="{ like: post.relations?.isLiked }" @click.stop="post?.relations?.isLiked ? unLike() : like()">
                    <i class="bi bi-heart-fill"></i>
                    {{ post.likeCount }}
                </div>
                <div class="control" @click="postComment.showCommentModel()">
                    <i class="bi bi-chat-dots-fill"></i>
                    {{ post.commentCount }}
                </div>
            </div>
            <ul class="commentCard flex flex-col">
                <comment v-for="(item, index) in data" :key="item.id" :comment="item" :commentIds="commentIds"
                    :commentChildMap="commentChildMap" :post="post">
                </comment>
                <div class="zeroComment" v-if="data.length <= 0 && !loading && isLastPage">
                    <a-empty description="暂无评论" />
                </div>
            </ul>
        </div>
        <loadingVue v-if="!initLoading" @load="page++" v-show="!isLastPage"></loadingVue>
    </div>
    <CommentModal ref="commentModalInst" :postId="post?.id" />
</template>

<script lang="ts" setup>
import loadingVue from "@/components/loading.vue";
import comment from "./postCommentCard.vue"
import { getPostComments, postLike, postCommentLike, type PostBody } from '@/apis/post';
import { useUserStore } from '@/stores/users';
import { useAppStore } from '@/stores/app';
import { message } from 'ant-design-vue';

import CommentModal from './commentModal.vue';
import { usePagination } from 'alova/client';
const commentModalInst = ref<{ open: (e?: PostComment) => void }>();
const postComment = {
    showCommentModel(e?: PostComment) {
        commentModalInst.value?.open(e)
    },
    async addComment(e: PostComment, topComment: PostComment) {
        console.log(e, topComment)
        if (!topComment) {
            console.log("插入")
            insert(e, 0);
            return
        }
        else {
            commentChildMap.value.set(e.id, e);
            await nextTick();
            if (!topComment.relations) topComment.relations = { subCommentIds: [] }
            topComment.relations.subCommentIds?.push(e.id);
        }
    },
}
provide("postComment", postComment)
const post = defineModel<Post>()
const appStore = useAppStore();
const userStore = useUserStore();

const route = useRoute();
const postId = Array.isArray(route.params.id) ? route.params.id.join(",") : route.params.id;


const initLoading = ref(true);
/* 一级评论id Set */
const commentIds = ref<Set<number>>(new Set())
/* 二级评论Map */
const commentChildMap = ref<Map<PostComment["id"], PostComment>>(new Map());

const {
    loading,
    data,
    isLastPage,
    page,
    reload,
    insert
} = usePagination<any, PostComment[]>(
    // Method实例获取函数，它将接收page和pageSize，并返回一个Method实例
    (page, pageSize) => getPostComments(postId, { page, pageSize }),
    {
        data: (response: InstanceBody<PostBody>) => {
            initLoading.value = false;
            console.log(response.data, '我是？？')
            userStore.setUsers(response.data.includes.users);
            response.data.post.relations.commentIds.forEach((e: number) => commentIds.value.add(e))
            response.data.includes.comments.forEach((e: PostComment) => {
                if (e.relations && e.relations.subCommentIds) {
                    e.relations.subCommentIds.forEach(j => {
                        const item = response.data.includes.comments.find(e => e.id === j)
                        if (item) commentChildMap.value.set(item.id, item)
                    })
                }
            });
            return response.data.includes.comments.filter(e => !e.relations || e.relations.subCommentIds)
        },
        append: true,
        immediate: true,
        initialPage: 1, // 初始页码，默认为1
        initialPageSize: 10 // 初始每页数据条数，默认为10
    }
);




/* 帖子取消点赞 */
async function unLike() {
    if (!post.value) return
    await postLike(post.value.id, true);
    if (post.value.relations) {
        post.value.relations.isLiked = false
    }
    if (post.value.likeCount > 0) post.value.likeCount--
    message.info("取消点赞")
}
/* 帖子点赞 */
async function like() {
    if (!post.value) return
    await postLike(post.value.id, false)
    post.value.likeCount++
    if (post.value.relations) {
        post.value.relations.isLiked = true
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

.zeroComment {
    margin: auto;
}
</style>