<template>
    <div class="flex between" style="align-items: flex-end;">
        <div class="CommentVote" v-if="vote" :class="{ CommentVoteSlashed: getSlashed() }">
            <h4 style="width:100%">作品评价</h4>
            <span style="white-space: nowrap;">
                <span>谱面评分:</span>
                <span style="font-size:22px; margin-right: 24px;"> {{ vote.chartScore ?? "无" }}</span>
            </span>
            <span>音乐评分:</span>
            <span style="font-size:22px;"> {{ vote.musicScore ?? "无" }}</span>
            <div class="CommentVoteShash" v-if="getSlashed()">
                削票原因:{{ vote.slashReason || "无" }}
            </div>
        </div>


        <a-dropdown v-if="appStore.userInfo && appStore.userInfo?.role > 0">
            <a class="ant-dropdown-link" @click.prevent>
                <i class="bi bi-list"></i>
            </a>
            <template #overlay>
                <a-menu @click="cutOffTicket">
                    <a-menu-item>
                        削票
                    </a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
    </div>
</template>

<script lang="ts" setup>
import { cutOffTicketAPI } from '@/apis/monf';
import { useAppStore } from '@/stores/app';
import { message } from 'ant-design-vue';

const appStore = useAppStore()

const prop = defineProps<{
    vote?: MonfComment;
}>()
const emit = defineEmits<{
    updateComment: [e: MonfComment]
}>()
function getSlashed() {
    return prop.vote?.isSlashed
}


async function cutOffTicket() {
    if (getSlashed()) {
        message.warn("已经削过票了")
        return;
    }
    if (appStore.userInfo && appStore.userInfo.role <= 0) return;
    if (!prop.vote) return;
    const message1 = prompt("请输入削票原因(选填)");
    if (message1 === null) return;
    const result = await cutOffTicketAPI(`${prop.vote.id}`, message1);
    if (result.code === 0) {
        emit("updateComment", result.data.workComment)
        // ArticlePage?.setMoveDetali(data.value.data.id,)
        message.success("削票成功")
    }
}
</script>
<style lang="less" scoped>
@media screen and (max-width: 1240px) {
    .CommentVote {
        min-width: 260px;
    }
}

.CommentVote {
    display: flex;
    padding: 10px 14px;
    font-size: 16px;
    border-radius: 8px;
    // border: 1px solid var(--mug-dividing);  
    flex-wrap: wrap;
    width: 40%;
    background-color: #EDF6FD;
    border: 1px solid rgba(199, 223, 251, 1);
    color: var(--mug-text);
    align-items: center;
    margin-top: 14px;
}

.CommentVoteSlashed {
    background-color: #FBEEF1;
    border-color: rgba(243, 203, 211, 1);

    span {
        color: #999;
        text-decoration: line-through;
    }

    h4 {
        display: none;
    }
}
</style>