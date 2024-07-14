<!--  -->
<script lang="ts" setup>
import { getPost, getPostComments, postLike } from '@/apis/post';
import UseHead from '@/components/useHead.vue';
import { useUserStore } from '@/stores/users';
import comments from './components/comments.vue';
import { MdPreview, MdEditor, MdCatalog } from 'md-editor-v3';
import sanitizeHtml from 'sanitize-html';
const route = useRoute()
const router = useRouter()
const post = ref<Post>();
const userStore = useUserStore();
const loading = ref(true);
const categories = ref<Categorie[]>([])
async function loadPost(id: string) {
    try {
        const result = await getPost(id);
        userStore.setUsers(result.data.includes.users);
        post.value = result.data.post;
        categories.value = result.data.includes.categories
    } finally {
        loading.value = false
    }

}
const sanitize = (html: string) => {

    html = html.replace(`&lt;mug-bilibili`, `<mug-bilibili`).replace(`&gt;&lt;/mug-bilibili&gt;`, `></mug-bilibili>`).replace(`<bilibili`,`<mug-bilibili`).replace(`</bilibili>`,`</mug-bilibili>`)

    // console.log(html)

    const newhtml = sanitizeHtml(html, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['mug-bilibili']),
        allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, "mug-bilibili": ["bvid"] }
    });
    // console.log(newhtml, 'xxx')
    return newhtml
}

if (typeof route.params.id === "string") {
    loadPost(route.params.id);
} else {
    router.replace("/noPage")
}


</script>

<template>
    <a-page-header title="返回" @back=" $router.back" class="pageHeader" />

    <div class="skeleton" v-show="loading">
        <a-skeleton active />
    </div>
    <div class="container" v-if="!loading && post">
        <div class="container-body">
            <UseHead padding="0 0 20px 0" :createdUserId="post.createdUserId" />
            <MdPreview :model-value="post.content" preview preview-only :sanitize="sanitize" />
            <div class="footerTags">
                <a-tag color="orange" v-for="item in categories">{{ item.name }}</a-tag>
            </div>
        </div>
        <comments v-model="post" />
    </div>
</template>

<style scoped lang="less">
.pageHeader {
    position: sticky;
    top: 0;
    background-color: #FAF8F8;
    z-index: 2;
}

.postContent {
    font-size: 12px;
    font-weight: 500;
    font-family: 'AlibabaPuHuiTi-2-45-Light';
    line-height: 26px;
    padding: 0 14px;

    :deep(p, ul, ol, blockquote) {
        margin-bottom: 1em;
    }
}

.container {
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
        background-color: #ffffff;
        padding: 14px 16px;
    }


}

.skeleton {
    padding: 12px 20px;
}
</style>