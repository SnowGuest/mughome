<script lang="ts" setup>
import { monfComment, monfCommentUpdate, type MonfCommentParams } from '@/apis/monf';
import { message, type FormInstance } from 'ant-design-vue';
const props = defineProps<{
    monfId?: Monf["id"];
    myWorkId?: MonfComment["id"];
    update: boolean;

}>();
const checkedChartVote = ref(false)
const checkedMusicVote = ref(false)
const open = ref(false);
const formRef = ref<FormInstance>();

const formState = reactive<MonfCommentParams>({
    workId: "",
    comment: "",
    chartScore: 0,
    musicScore: 0,
});
if (props.monfId) formState.workId = props.monfId;
defineExpose({
    open() {
        open.value = true
    }
});
const rules = computed<FormInstance["rules"]>(e => ({
    comment: { required: true, type: "string", message: "请输入评论内容" },
    chartScore: { required: checkedChartVote.value, type: "number", message: "请输入谱面分数" },
    musicScore: { required: checkedMusicVote.value, type: "number", message: "请输入音乐分数" },
}))
async function submit() {
    let data;
    await formRef.value?.validate();
    if (props.update && props.myWorkId) {
        console.log("进入这里")
        const result = await monfCommentUpdate(props.myWorkId, {...formState})
        data = result.data
    } else {
        const result = await monfComment({...formState})
        data = result.data
    }
    message.success("评论成功");
    formRef.value?.resetFields()
}
</script>

<template>
    <a-modal v-model:open="open" @ok="submit" title="评论/打分">
        <a-form ref="formRef" :model="formState" :rules="rules" @submit="submit">
            <a-form-item name="comment">
                <a-textarea @change="() => {
                    if (formState.comment) formState.comment = formState.comment.trim();
                }" v-model:value="formState.comment" placeholder="请输入评论" :maxlength="200" showCount
                    :rows="5"></a-textarea>
            </a-form-item>
            <a-row>
                <a-col :span="12">
                    <a-form-item name="chartScore">
                        <template #label>
                            <a-form-item-rest>
                                <a-checkbox v-model:checked="checkedChartVote">谱面分数</a-checkbox>
                            </a-form-item-rest>
                        </template>
                        <a-input-number max="100" :disabled="!checkedChartVote"
                            v-model:value="formState.chartScore"></a-input-number>
                    </a-form-item>
                </a-col>

                <a-col :span="12">

                    <a-form-item name="musicScore">
                        <template #label>
                            <a-form-item-rest>
                                <a-checkbox v-model:checked="checkedMusicVote">音乐分数</a-checkbox>
                            </a-form-item-rest>
                        </template>
                        <a-input-number max="100" :disabled="!checkedMusicVote"
                            v-model:value="formState.musicScore"></a-input-number>
                    </a-form-item>
                </a-col>

            </a-row>
        </a-form>
    </a-modal>
</template>

<style scoped></style>