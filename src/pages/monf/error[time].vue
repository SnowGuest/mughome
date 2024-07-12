<script lang="ts" setup>
import { useCompetition } from "@/stores/competition";
const competitions = useCompetition()
const route = useRoute();
const router = useRouter();
const time = Array.isArray(route.params.time) ? route.params.time.join() : route.params.time;
const competition = competitions.getCompetition(time, "monf");
if (competition?.status === "start") {
    router.replace({
        path: "/monf"
    })
}

</script>

<template>
    <a-result status="404" title="没有这个比赛" sub-title="我们没找到这个比赛,请确认你的链接是对的" v-if="!competition">
        <template #extra>
            <a-button type="primary">Back Home</a-button>
        </template>
    </a-result>
    <a-result status="403" title="你不该来到这" sub-title="当前比赛还没开放投稿" v-else-if="competition.status === 'noStart'">
        <template #extra>
            <router-link to="/competition">
                <a-button type="primary">返回首页</a-button>
            </router-link>
        </template>
    </a-result>
    <a-result status="warning" title="当前比赛已停止投稿" v-else-if="competition.status === 'end'">
        <template #extra>
            <router-link to="/competition">
                <a-button type="primary">返回首页</a-button>
            </router-link>
        </template>
    </a-result>
</template>

<style scoped></style>