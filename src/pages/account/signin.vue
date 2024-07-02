<script lang="ts" setup>
const formState = reactive({
    account: ""
})
</script>

<template>
    <div class="signin relative">
        <a-form :model="formState">



        </a-form>
    </div>
</template>

<style scoped>
.signin {
    overflow: hidden;
    flex: 1;
    background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
}
</style>