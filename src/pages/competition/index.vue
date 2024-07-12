<!--  -->
<script lang="ts" setup>
import { useCompetition } from '@/stores/competition';
import card from './components/card.vue';
import { storeToRefs } from 'pinia';
const { startCard, noStartCard, endCard } = storeToRefs(useCompetition())
console.log(
    startCard,
    noStartCard,
    endCard
)
</script>

<template>
    <div class="container">
        <h3 class="title" v-if="noStartCard.length > 0">未开始</h3>
        <a-row class="posts" :gutter="[8, 8]">
            <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" v-for="item in noStartCard">
                <card :item noClick />
            </a-col>
        </a-row>
        <h3 class="title" v-if="startCard.length > 0">正在进行中</h3>
        <a-row class="posts" :gutter="[8, 8]">
            <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" v-for="item in startCard">
                <card :item  />

            </a-col>
        </a-row>
        <h3 class="title" v-if="endCard">已结束</h3>
        <a-row class="posts" :gutter="[8, 8]">
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