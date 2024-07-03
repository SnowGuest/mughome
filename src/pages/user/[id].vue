<script lang="ts" setup>
import lineVue from '@/components/line.vue';
</script>

<template>
    <div class="flex justify-center user">
        <div class="leftCard"></div>
        <div>
            <div class="card flex flex-col">
                <div class="flex-center flex-col" style="padding: 12px;">
                    <a-avatar :size="128"></a-avatar>
                    <div class="username">用户名</div>
                    <div class="joinDate">2022-1-1</div>
                </div>
                <lineVue></lineVue>
                <div class="flex justify-around" style="padding:10px 0">
                    <div class="flex-center flex-col">
                        <div class="cardFooterLabel">已关注</div>
                        <div class="cardFooterNum">0</div>
                    </div>
                    <div class="flex-center flex-col">
                        <div class="cardFooterLabel">被关注</div>
                        <div class="cardFooterNum">114514</div>
                    </div>
                </div>
                <lineVue></lineVue>
                <div style="padding: 12px;">
                    <a-button block type="primary">关注</a-button>
                </div>
            </div>
            举报用户
        </div>
    </div>
</template>

<style scoped>
.card {
    /* width: 320px; */
    background-color: #ffffff;
    border-radius: 12px;
}

.username {
    font-size: 22px;
    font-weight: bold;
    margin: 14px 0 6px;
}

.joinDate {
    font-size: 12px;
    font-weight: 400;
}

.cardFooterLabel {
    font-size: 12px;
    margin-bottom: 6px;
}

.cardFooterNum {
    font-size: 20px;
    font-weight: bold;
}

.user {
    width: 1000px;
    max-width: 100%;
    padding: 0 16px;
    display: grid;
    column-gap: 20px;
    grid-template-columns: minmax(0, 1fr) minmax(250px, 34%);
    margin: 0 auto;
}

.leftCard {
    background-color: #ffffff;
    border-radius: 12px;
    min-height: 400px;
}

@media screen and (max-width:768px) {
    .user {
        display:flex;
        flex-direction: column-reverse;
    }
}
</style>