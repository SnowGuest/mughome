<script lang="ts" setup>
import { getMonfs, type MonfsParams } from '@/apis/monf';
import { useUserStore } from '@/stores/users';
import { usePagination } from 'alova/client';
import Monf from './components/monf.vue';
const filter = ref<string[]>([])
const options = [{
    value: 'averageScore',
    label: '平均分', children: [{ label: "降序", value: "down" }, { label: "升序", value: "up" }]
}, {
    value: 'score',
    label: '总分', children: [{ label: "降序", value: "down" }, { label: "升序", value: "up" }]
}, {
    value: 'rank',
    label: '排名(平均分)', children: [{ label: "降序", value: "down" }, { label: "升序", value: "up" }]
}, {
    value: 'createdDate',
    label: '发布日期', children: [{ label: "降序", value: "down" }, { label: "升序", value: "up" }]
}];
const userStore = useUserStore();
const route = useRoute();
const monfs = ref<Monf[]>([]);
const loading = ref(true)
console.log(route)
async function loadMonfs() {

    const result = await getMonfs({
        session: route.params.time as MonfsParams["session"],
    })
    userStore.setUsers(result.data.includes.users);
    monfs.value = result.data.works.map(e => ({
        ...e,
        score: `${Number(e.chartScoreTotal) + Number(e.musicScoreTotal)}`,
        averageScore: (Number(e.chartScoreAvg) + Number(e.musicScoreAvg)).toFixed(2)
    }));
    await nextTick();
    loading.value = false
}
loadMonfs();
function updateList() {
    const time = Date.now();
    loading.value = true;
    const key = filter.value[0] as "averageScore" | "score" | "rank" | "createdDate"
    const sort = filter.value[1]
    setTimeout(() => {
        monfs.value.sort((a, b) => {
            return sort == "up" ? Number(`${a[key]}`) - Number(`${b[key]}`) : Number(`${b[key]}`) - Number(`${a[key]}`)
        })
        loading.value = false;
    }, 2000 - (Date.now() - time))
}
</script>

<template>
    <div class="container ">
        <div class="monfs flex flex-col">
            <div class="skeleton" v-show="loading">
                <a-skeleton active />
            </div>
            <Monf v-for="item in monfs" :item="item" v-show="!loading" :id="item.id" :time="route.params.time"></Monf>
        </div>
        <div class="right flex flex-col">
            <div class="card ">
                <div class="card-body">
                    <router-link to="/creater/monf">
                        <a-button type="primary" block size="large">
                            <i class="bi bi-cursor-fill mr-1"></i>
                            快捷投稿
                        </a-button>
                    </router-link>
                </div>
            </div>
            <a class="card  flex justify-between link" href="https://www.bilibili.com/read/cv24413136/" target="_blank">
                <span>查看比赛规则</span>
                <i class="bi bi-chevron-right"></i>
            </a>
            <div class="card flex flex-col">
                <div class="title">
                    排序规则
                </div>
                <div class="card-body">
                    <a-cascader @change="updateList" v-model:value="filter" :options="options" placeholder="排序规则" />
                </div>
            </div>
            <div class="card flex flex-col">
                <div class="title">
                    比赛日程
                </div>
                <div class="card-body">
                    <div class="label">开放投稿/评分开始：</div>
                    <div class="value">2023年07月29日 00:00</div>
                    <div class="label">截稿</div>
                    <div class="value">2023年08月31日 16:00</div>
                    <div class="label">评分结束</div>
                    <div class="value">2023年09月09日 16:00</div>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped lang="less">
.container {
    padding: 40px 14px;
    margin: 0 auto;
    display: grid;
    column-gap: 20px;
    grid-template-columns: minmax(0, 560px) minmax(300px, 34%);
    margin: 0 auto;
    justify-content: center;
    .link {
        padding: 14px 20px;

        span,
        i {
            font-weight: bold;
        }
    }

    .right {
        row-gap: 10px;
        position: sticky;
        top: 16px;
        align-self: flex-start;
        max-width: 100%;
        width: 300px;
    }

    .card {
        background-color: #ffffff;
        border-radius: 4px;
        width: 100%;

        &-body {
            padding: 14px 20px;

        }

        .title {
            padding: 14px 20px;
            font-weight: bold;
            padding-bottom: 12px;
            border-bottom: 1px solid #dddddd;
            margin-bottom: 12px;
        }

        .label {
            margin-bottom: 6px;
            font-size: 14px;
        }

        .value {
            margin-bottom: 12px;
            font-size: 16px;
        }
    }
}

.monfs {
    // width: 560px;
    max-width: 100%;
    row-gap: 14px;

}

.skeleton {
    background-color: #fff;
    padding: 16px;
    border-radius: 4px;
}

@media screen and (max-width:900px) {
    .container {
        display: flex;
        padding: 0px 16px 0 !important;
        flex-direction: column-reverse;
    }

    .right {
        position: static !important;
        width: 100% !important;
    }
}
</style>