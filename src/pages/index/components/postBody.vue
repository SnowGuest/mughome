<script lang="ts" setup>
import { LazyImg } from 'vue-waterfall-plugin-next'

const router = useRouter()
defineProps<{ item: Post, url?: string }>();



</script>
<!-- @click="item.relations.isLiked ? unLike(item) : like(item)" -->
<template>
    <div class="post-body">
        <router-link :to="`/post/${item.id}`" class="post-title">{{ item.title }}</router-link>
        <LazyImg v-if="url" :url="url" />
        <!-- <img v-if="item.headerImage" :src="item.headerImage" alt="" @click="toDetali(item)" /> -->
    </div>
    <div class="post-footer flex items-baseline mt-a">
        <router-link  :to="`/post/${item.id}`" class="control control-like" :class="{ like: item.relations.isLiked }">
            <i class="bi bi-heart-fill"></i>
            {{ item.likeCount }}
        </router-link>
        <router-link class="control" :to="`/post/${item.id}#comments`">
            <i class="bi bi-chat-dots-fill"></i>
            {{ item.commentCount }}
        </router-link>
        <span class="viewText ml-a">浏览 {{ item.viewCount }}</span>
    </div>
</template>

<style scoped lang="less">
.post {
    background-color: #ffffff;
    height: 200px;
    border-radius: 12px;

    .viewText {
        font-size: 12px;
        color: #aaa;

    }

    &-body {
        padding: 0 14px;
        max-width: 100%;
        overflow: hidden;

        img {
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
        display: block;
    }

    &-footer {
        padding: 14px;
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
    cursor: pointer;

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
