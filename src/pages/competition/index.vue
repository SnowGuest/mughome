<!--  -->
<script lang="ts" setup>
import card from './components/card.vue';
const startCard = [{
    title: "monf2024",
    status: "start",
    time: "2024",
    endDate: "2024/9/2",
    userName: "Monf赛事主办",
    path: "/monf/2024"
}]
const endCard = [{
    title: "monf2023",
    status: "end",
    time: "2023",
    endDate: "2023/9/2",
    userName: "Monf赛事主办",
    path: "/monf/2023"
},
{
    title: "bof2023",
    status: "end",
    time: "2023",
    endDate: "2023/9/2",
    userName: "音柚娘",
    path: "https://baidu.com"
}]
</script>

<template>
    <div class="container">
        <h3 class="title">正在进行中</h3>
        <a-row class="posts" :gutter="[8, 8]" v-once>
            <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" v-for="item in startCard">
                <card :item />

            </a-col>
        </a-row>
        <h3 class="title">已结束</h3>
        <a-row class="posts" :gutter="[8, 8]" v-once>
            <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" v-for="item in endCard">
                <card :item />
            </a-col>
        </a-row>

    </div>

</template>

<style scoped lang='less'>
.container {
    margin: 0 auto;
    padding: 0 16px;

    &>.title:first-child {
        margin: 0;
    }

    &>.title {
        margin-top: 30px;
        padding: 16px 0;
    }
}
</style>