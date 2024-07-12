<script lang="ts" setup>
import { message } from 'ant-design-vue';


const router = useRouter()
const props = defineProps<{ item: any, noClick?: boolean }>();
const statusText = { noStart: "尚未开始", start: "接收投稿中", stop: "已停止投稿", end: "已结束投稿" }
function getStatusText(status: string) {
    return statusText[status as keyof typeof statusText]
}
function toDetali() {
    if (!props.noClick) {
        router.push(props.item.path)
    } else {
        message.info("比赛尚未开始")
    }
}
</script>

<template>
    <div :class="{ 'card-click': !noClick }" class="card flex flex-col" @click="toDetali">
        <img :src="item.img" alt="" height="120" />
        <div class="card-body flex flex-col flex-1">
            <p :class="`status status-${item.status}`">
                {{ getStatusText(item.status) }}
            </p>
            <p class="card-title">{{ item.title }}</p>
            <p class="endDate" v-if="item.status === 'noStart'">开始日期: {{ item.startTime }}</p>
            <p class="endDate" v-else>截稿日期: {{ item.endDate }}</p>
        </div>
        <div class="card-footer mt-a">
            <a-avatar></a-avatar>
            <span class="nickName">{{ item.userName }}</span>
        </div>
    </div>
</template>

<style scoped lang="less">
.card-click {
    cursor: pointer;
}

.card {
    background-color: #ffffff;
    min-height: 290px;
    overflow: hidden;
    border-radius: 4px;
    transition: all 0.21s;

    .status-start {
        color: #1677FF;
    }

    .status-stop {
        color: #ff6700;
    }

    .status-noStart {
        color: #aaa;
    }


    .status-end {
        color: red;
    }

    .status {
        font-size: 12px;
        margin-bottom: 12px;
    }

    .endDate {
        margin-top: auto;
        color: #ccc;
        font-size: 12px;
        text-align: end;
    }

    &:hover {
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }

    &-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 12px;
    }

    &-body {
        padding: 12px;
    }

    &-footer {
        padding: 12px;

        .nickName {
            font-size: 12px;
            color: #aaa;
            margin-left: 12px;
        }
    }
}
</style>