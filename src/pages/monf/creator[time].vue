<template>
    <div class="monf container">
        <a-spin :spinning="loading">
            <h2>MONF作品投稿</h2>
            <a-divider />
            <a-form ref="formRef" :label-width="80" :model="formValue" :rules="rules">
                <a-form-item label="队伍名称" name="teamName">
                    <a-input v-model:value="formValue.teamName" placeholder="请输入您的队伍名称" />
                </a-form-item>
                <a-form-item label="歌曲名称" name="songName">
                    <a-input v-model:value="formValue.songName" placeholder="请输入参赛歌曲的曲名" />
                </a-form-item>
                <a-form-item label="队员" name="members">
                    <div>
                        <div class="mb-2">
                            <a-button @click="setMemberShow = true">添加</a-button>
                        </div>
                        <a-list clickable :data-source="formValue.members">
                            <template #renderItem="{ item, index }">
                                <a-list-item>
                                    <a-list-item-meta>
                                        <template #title>
                                            <div class="flex">
                                                {{ item.memberName }}
                                                <i class="bi bi-x-lg ml-a" @click="formValue.members.splice(index, 1)"
                                                    style="font-size: 14px;"></i>
                                            </div>
                                        </template>

                                        <template #description>
                                            <a-tag size="small">{{ item.memberJob }}</a-tag>
                                        </template>
                                    </a-list-item-meta>

                                </a-list-item>
                            </template>
                        </a-list>
                    </div>
                </a-form-item>
                <a-form-item label="歌曲SID" name="malodySID">
                    <a-input v-model:value="formValue.malodySID" placeholder="请输入参赛歌曲的SID" />
                </a-form-item>
                <a-form-item label="简介" name="intro">
                    <a-textarea max="1000" :rows="5" v-model:value="formValue.intro" placeholder="请输入作品简介" />
                </a-form-item>
                <a-form-item label="BV号" name="bilibiliLink">
                    <a-input v-model:value="formValue.bilibiliLink" placeholder="请输入一个投稿视频的BV号" />
                </a-form-item>

                <a-form-item>
                    <a-button class="w-20 m-auto" @click="submitMonf" block type="primary" size="large">投稿</a-button>
                </a-form-item>
            </a-form>


        </a-spin>
    </div>
    <a-modal v-model:open="setMemberShow" title="添加队员" @ok="setMemberItem">
        <div class="bg-white p-6 pb-0 border-rd-2">
            <a-form :model="addMemberForm" label-placement="left" ref="setMemberFormRef">
                <a-form-item label="名称" path="memberName" required message="请输入队员名称">
                    <a-input v-model:value="addMemberForm.memberName" placeholder="队员名称" />
                </a-form-item>
                <a-form-item label="职位" path="memberJob" required message="请输入队员职位">
                    <a-input v-model:value="addMemberForm.memberJob" placeholder="队员职位" />
                </a-form-item>
                <a-form-item label="Malody UID" path="memberMalodyUID">
                    <a-input-number :show-button="false" v-model:value="addMemberForm.memberMalodyUID"
                        placeholder="Malody UID" style="width:100%" />
                </a-form-item>
            </a-form>
        </div>
    </a-modal>
</template>

<script lang="ts" setup>
import type { MonfPublishMember, MonfPublishParams } from "@/apis/monf";
import { monfPublish } from "@/apis/monf";
import { useCompetition } from "@/stores/competition";
import type { FormInstance } from "ant-design-vue";
const router = useRouter()
const route = useRoute();
const competitions = useCompetition();
let saveTime = new Date().getFullYear()
function init() {
    const time = Array.isArray(route.params.time) ? route.params.time.join() : route.params.time;
    saveTime = parseInt(time)
    const competition = competitions.getCompetition(time, "monf");
    if (!competition || competition.status !== "start") {
        router.replace({
            path: `/error/monf/${time}`
        })
        return
    }
    loading.value = false
}
init();

const rules = {
    teamName: { required: true, message: "请输入您的队伍名称" },
    songName: { required: true, message: "请输入参赛歌曲的曲名" },
    malodySID: { required: true, message: "请输入参赛歌曲的SID" },
    intro: { required: true, message: "请输入作品简介" },
    bilibiliLink: { required: true, message: "请输入视频BV号" },
    members: [{
        required: true,
        message: "请添加队员",

    }]
}


const formValue = reactive<MonfPublishParams>({
    teamName: "",
    songName: "",
    malodySID: "",
    intro: "",
    members: [],
    bilibiliLink: ""
});
const addMemberForm = reactive<MonfPublishMember>({
    memberName: "",
    memberJob: "",
    memberMalodyUID: undefined,
})
const loading = ref(false)
const setMemberShow = ref(false)
const formRef = ref<FormInstance>();
const setMemberFormRef = ref<FormInstance>();
async function setMemberItem() {
    if (!setMemberFormRef.value) return;
    await setMemberFormRef.value.validate();
    const addMemberFormJSON = JSON.parse(JSON.stringify(addMemberForm))
    if (!addMemberFormJSON.memberMalodyUID) Reflect.deleteProperty(addMemberFormJSON, "memberMalodyUID");
    else addMemberFormJSON.memberMalodyUID = parseInt(addMemberFormJSON.memberMalodyUID)
    formValue.members.push(addMemberFormJSON);
    setMemberShow.value = false;
    addMemberForm.memberJob = "";
    addMemberForm.memberMalodyUID = undefined;
    addMemberForm.memberName = "";
}

async function submitMonf() {
    try {
        if (!formRef.value) return;
        await formRef.value.validate();
        loading.value = true;
        const d = JSON.parse(JSON.stringify(formValue))
        const result = await monfPublish({ ...d, session: saveTime })
        if (result.data.work.id) {
            router.replace({
                path: `/monf/${result.data.work.id}`,
                replace: true,
            })
        }
    } finally {
        loading.value = false;
    }
}

</script>
<style lang="less" scoped>
.monf {
    width: 765px;
    background-color: #FFFFFF;
    max-width: 100%;
    margin: 0 auto;
    padding: 16px 14px;
}
</style>