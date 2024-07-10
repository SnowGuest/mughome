<template>
    <div class="commentCard column">
        <!-- <div :immediate-check="false" @load="load_comment">
            <li v-for="[id, item] in comments" class="comment" v-show="!item.isHidden" :key="item.id">
                <useHead />
                <div class="commentBody">

                    <CommentVote @updateComment="e => updateComment(item, e)" v-if="showVote(item)" :commentId="item.id"
                        :vote="item" />
                    <div class="commentContent">{{ item.comment }}</div>

                    <div class="commentControl align-center" :id="`commentControl${item.id}`">
                        <time class="time">发布于 {{ getCreateTime(item.createdDate) }}</time>
                    </div>

                </div>

            </li>

        </div> -->
    </div>
</template>

<script lang="ts" setup>
// import useHead from "@/components/useHead.vue"
// import CommentVote from "./commentVote.vue"
// import dayjs from "dayjs";
// import { Image, Empty, showSuccessToast, showFailToast } from "vant"
// import { commentLike } from "@/api/comment";
// import { ArticleSortField, Comment, GetArticleParams, MonfVoteDetail } from '@/api/post';
// import { Monf, MonfComment, monfCommentLike, monfLike, monfunCommentLike, monfunLike } from '@/api/monf';
// import { getMonf2023Comment } from "@/api/monf";
// import { User } from "@/api/user";
// import { storeToRefs } from "pinia";
// import { useUserStore } from "@/stores/user";
// export interface MonfCommentAPI {
//     show: () => void
// }
// function showVote(comment: MonfComment) {
//     return typeof comment.chartScore === 'number' || typeof comment.musicScore === 'number'
// }
// interface Prop {
//     id: number | string;
//     myWorkId?: number;
//     editMonf: boolean;
// }
// const emits = defineEmits<{
//     (event: 'setMonfId', id: number): void
// }>()
// const commentId = ref<number>()
// const showComment = ref(false)
// defineExpose<MonfCommentAPI>({
//     show() {
//         showComment.value = true
//     },
// })
// const props = defineProps<Prop>();

// const searchParams = reactive<GetArticleParams>({
//     sortField: ArticleSortField.createdDate,
//     sortType: "asc",
//     id: props.id,
//     page: 1,
//     pageSize: 10
// });
// async function loadComment() {
//     console.log(searchParams, '我是')
//     const { data } = await getMonf2023Comment("monf/comments", searchParams);
//     const status = reactive({
//         finished: false,
//         loading: true,
//         error: false
//     });
//     const users = getUserMap(data.value?.data.includes.users);
//     if (data.value?.data?.workComments && data.value?.data?.workComments?.length <= 0) {
//         status.loading = false;
//         status.finished = true
//     } else {
//         status.loading = false;
//         status.error = true
//     }
//     return { status, comments: ref(new Map(data.value?.data.workComments.map(e => [e.id, e]))), users }
// }


// const { status, users, comments } = await loadComment()

// function getUser(id: number) {
//     return users.get(id)
// }
// function getCreateTime(time: string) {
//     return dayjs(dayjs()).diff(time, "hour") > 12 ? dayjs(time).format("YYYY/MM/DD HH:mm") : dayjs(time).fromNow();
// }
// function comment(e: MonfComment) {
//     commentId.value = e.id;
//     showComment.value = true
// }

// async function putComment(user: User[], comment: MonfComment) {
//     getUserMap([...user], users);
//     if (typeof comment.relations?.parentCommentId === "number") {
//         const flag = comments.value.get(comment.relations?.parentCommentId)
//         if (!flag) return;
//         if (!Array.isArray(flag?.children)) flag.children = [];
//         flag?.children.push(comment)
//     } else if (comment && !comment.relations) {
//         comments.value.set(comment.id, comment)
//     }
//     emits("setMonfId", comment.id)
// }


// const { logged } = storeToRefs(useUserStore())
// async function likeComment(comment: MonfComment) {
//     try {
//         if (!logged.value.login) {


//             showFailToast("请先登录"); return;
//         }
//         let isLike = Boolean(comment.relations?.isLiked)
//         console.log(isLike)
//         const { data } = await (isLike ? monfunCommentLike : monfCommentLike)(`monf/${isLike ? "monfunCommentLike" : "monfCommentLike"}/${comment.id}`, comment.id);
//         if (data.value?.code === 0) {
//             const sum = isLike ? -1 : 1;
//             if (!comment.relations) comment.relations = {}
//             comment.relations.isLiked = !isLike
//             showSuccessToast(isLike ? "取消点赞" : "点赞成功");
//             comment.likeCount += sum
//         }

//     } catch (error) {
//         if (error instanceof Error) {
//             showFailToast(error.message)
//         }
//     }
// }

// async function load_comment() {
//     try {
//         if (status.loading) return;
//         if (!props.id) return;
//         if (typeof searchParams.page !== "number") return;
//         searchParams.page++;
//         status.loading = true
//         const { data } = await getMonf2023Comment("monf/comments/next", searchParams);
//         getUserMap(data.value?.data.includes.users, users);
//         data.value?.data.workComments.forEach(e => {
//             comments.value.set(e.id, e)
//         })
//         // if (result?.scores) scores.value = result.scores.value
//         status.finished = typeof data.value?.data.includes?.commentEnd === "boolean" ? data.value?.data.includes?.commentEnd : false
//     } finally {
//         status.loading = false
//     }
// }
// async function setCommentType(e: ArticleSortField) {
//     try {
//         if (!props.id) return;
//         const page = searchParams.page
//         const pageSize = searchParams.pageSize
//         searchParams.page = 1
//         searchParams.pageSize = comments.value.size;
//         searchParams.sortField = e;
//         status.finished = false;
//         status.loading = true;
//         comments.value.clear()
//         const { data } = await getMonf2023Comment("monf/comments/checkAction", searchParams);
//         data.value?.data.workComments.forEach(e => {
//             comments.value.set(e.id, e)
//         })
//         status.finished = typeof data.value?.data.includes?.commentEnd === "boolean" ? data.value?.data.includes?.commentEnd : false;
//         searchParams.page = page
//         searchParams.pageSize = pageSize
//     } finally {
//         status.loading = false;
//     }

// }
// function updateComment(newComment: MonfComment, oldComment: MonfComment) {
//     Object.assign(newComment, oldComment)
// }
</script>
<style lang="scss" scoped>
.comment {
    margin-bottom: 20px !important;
}

.comment,
.commentChildBody {
    display: flex;
    align-items: flex-start;
    margin-bottom: 30px;
}

.commentChildBody:last-child {
    margin-bottom: 0;
}

.commentBody {
    width: 100%;
    margin-left: 14px;
    padding-top: 10px;
}

.commentContent {
    margin-top: 12px;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    padding: 0 14px;
}

.nickName,
.nickName-child {
    color: var(--mug-text);
    font-size: 18px;
    font-weight: 500;
}

.nickName-child {
    font-size: 17px;
    margin-bottom: 0px;
    margin-left: 16px;
}

.commentControlChild {
    margin-bottom: 0px !important;
}

.commentControl {
    color: var(--mug-sub-text);
    font-size: 13px;
    margin: 16px 0 14px;
    display: flex;

    .time {
        margin-right: 12px;
    }

    .commentBack {
        cursor: pointer;
    }


}

.commentLike {
    cursor: pointer;

    .likeCount {
        color: var(--mug-sub-text);
        margin-right: 4px;
    }
}

.isLiked {
    transform: translateY(-2px);
}

.desu {
    font-weight: 500;
    font-size: 12px;
    margin-top: 4px;
    color: var(--mug-sub-text);
    width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}


@media screen and (max-width: 1240px) {
    .commentCard {
        padding: 21px 20px 0px !important;
    }
}

.commentCard {
    padding: 28px 40px 0px;
    border-radius: 8px 8px 0px 0px;
    color: var(--mug-text);
    background-color: var(--mug-card-bg);
    position: relative;
    margin-top: 16px;

    .commentCard_header {
        margin-bottom: 24px;

        h3 {
            font-size: 22px;
            font-weight: 500;
        }
    }


}

.selectComment {
    font-size: 13px;
    color: var(--mug-sub-text);
    display: flex;
    align-items: center;
    cursor: pointer;

    .CommentTypeActive {
        color: var(--mug-text);
    }

    li {
        padding: 4px 6px;
    }

    .diviving {
        padding: 0 !important;
        background-color: var(--mug-dividing);
        margin: 0 6px;
        width: 1px;
        height: 50%;
    }
}
</style>