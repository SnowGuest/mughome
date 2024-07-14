<script lang="ts" setup>
import { postComment } from '@/apis/post';
import { useUserStore } from '@/stores/users';
import { message, type FormInstance } from 'ant-design-vue';
const route = useRoute();
const postCommentProvide = inject<Record<string, any>>("postComment")

const postId = typeof route.params.id === "string" ? route.params.id : route.params.id.join("")
const open = ref(false);
const comment = ref<PostComment>()
const content = ref("");
const userStore = useUserStore()
defineExpose({
    open(e?: PostComment) {
        comment.value = e
        open.value = true
    }
});

async function submit() {
    if (content.value.length <= 0) {
        message.warn("请输入评论内容")
        return
    }
    const result = await postComment(postId, content.value, comment.value?.id)
    message.success("评论成功");
    userStore.setUsers(result.data.includes.users)
    open.value = false;
    content.value = "";
    postCommentProvide?.addComment(result.data.comment, comment.value)

    console.log(comment.value, '上一条实例')
}
</script>

<template>
    <a-modal v-model:open="open" @ok="submit" title="评论" @cancel="comment = undefined">
        <div style="padding:16px 0">
            <a-textarea @change="() => {
                if (content) content = content.trim();
            }" v-model:value="content" placeholder="请输入评论" :maxlength="200" showCount :rows="5"></a-textarea>
        </div>
    </a-modal>
</template>

<style scoped></style>