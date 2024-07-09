<script lang="ts" setup>
import dayjs from 'dayjs/esm';

const router = useRouter()
const props = defineProps<{ item: Post }>();

function toDetali(post: Post, target = "") {
    router.push({
        path: `/post/${post.id}${target}`
    })
}
const createTime = computed(() => {
    const articleCreateTime = props.item.createdDate
    return dayjs(dayjs()).diff(articleCreateTime, "hour") > 12 ? dayjs(articleCreateTime).format("YYYY/MM/DD HH:mm") : dayjs(articleCreateTime).fromNow();
});
</script>
<!-- @click="item.relations.isLiked ? unLike(item) : like(item)" -->
<template>
    <div class="post-body">
        <div class="post-title">{{ item.title }}</div>
        <img :src="item.headerImage" alt="" />
    </div>
    
    <div class="post-footer flex items-baseline mt-a">
        <div class="control control-like"
            :class="{ like: item.relations.isLiked }">
            <i class="bi bi-heart-fill"></i>
            {{ item.likeCount }}
        </div>
        <div class="control" @click="toDetali(item, '#comment')">
            <i class="bi bi-chat-dots-fill"></i>
            {{ item.commentCount }}
        </div>
        <span class="viewText ml-a">浏览 {{ item.viewCount }}</span>

        <span class="viewText ml-1"> · 发布于{{ item.createdDate }}</span>
    </div>
</template>

<style scoped lang="less">
.post {
    background-color: #ffffff;
    height: 200px;
    border-radius: 12px;
    .viewText{
        font-size: 12px;
        color: #aaa;
        
    }
    &-body {
        padding: 0 14px;
        max-width: 100%;
        overflow: hidden;
        img{
            width: 100%;
            object-fit: cover;
            cursor: pointer;
        }
    }

    &-title {
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        margin-bottom: 12px;
    }
    &-footer{
        padding:  14px;
    }
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
