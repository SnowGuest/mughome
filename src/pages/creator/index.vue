<template>
    <div class="creator">
        <div class="creator-header flex items-center">
            <img src="@/assets/images/logo.png" alt="" width="40" height="40" />
            稿件管理/{{ route.params.id ? '编辑' : '发帖' }}
        </div>
        <input v-model="form.title" type="text" class="titleInput outline-none" placeholder="输入标题">
        <MdEditor ref="editorRef" @on-upload-img="onUploadImg" :toolbars="toolbar" class="Editor"
            v-model="form.content">
            <template #defToolbars>
                <NormalToolbar title="Bilibili" @onClick="addBilibili">
                    <template #trigger>
                        <img src="@/assets/images/bilibili.svg" alt="">
                    </template>
                </NormalToolbar>
            </template>

        </MdEditor>

        <!-- <div class="right">
            <div class="card-right ">
                <h2>设置</h2>
                <a-alert type="info" show-icon>
                    <template #message>
                        发帖则表示您同意MUGHome社区
                        <a href="" target="_blank">《使用规范》</a>和
                        <a href="" target="_blank">《发帖规范》</a>
                    </template>
                </a-alert>
                <a-form label-placement="left" ref="formRef" :model="form" :rules="rules">
                    <a-form-item path="headerImage" style="margin-top: 20px;">

                        <a-upload-dragger accept="image/*" v-model:fileList="headerImages" name="file"
                            :multiple="false">

                            <p class="ant-upload-text">点击上传封面头图</p>

                        </a-upload-dragger>
                    </a-form-item>
                    <div class="card-right-top">
                        <a-form-item class="right-form-item" path="categoryId[0]">
                            <a-select placeholder="一级分区" v-model:value="form.categoryId[0]"
                                :options="categorieOneOptions" @change="form.categoryId[1] = null" />
                        </a-form-item>
                        <a-form-item class="right-form-item" path="categoryId[1]">
                            <a-select placeholder="二级分区" clearable v-model:value="form.categoryId[1]"
                                :options="categorieTwoOptions" />

                        </a-form-item>

                    </div>

              <a-form-item label="摘要" path="description">
                        <a-input type="textarea" :placeholder="placeholder" v-model:value="form.description" />
                    </a-form-item>
                    <a-form-item v-if="form.categoryId[1] === 34">
                        <a-checkbox v-model:checked="form.isMONFVote">
                            参与MONF大赛打分
                        </a-checkbox>
                    </a-form-item>
                    <a-form-item>
                        <a-button @click="sendPost" type="primary" block>
                            发布
                        </a-button>
                    </a-form-item>
                </a-form>

            </div>
        </div> -->
    </div>
    <a-modal v-model:open="showSuccess">
        <div class="successCard">
            <h3>发表成功！</h3>
            <p>帖子已经发布成功，接下来您想要？</p>
            <div class="successCard-footer">
                <a-button type="info" @click="router.replace({ path: `/` })">回到首页</a-button>
                <a-button type="success" @click="router.replace({ path: `/article/${post?.post.id}` })">
                    查看详情</a-button>
            </div>
        </div>
    </a-modal>
    <a-modal v-model:open="showCheckBilibili">
        <a-input-group class="BilibiliModel">
            <a-select :style="{ width: '25%' }" :options="BilibiliOption" v-model:value="Bilibili.type" />
            <a-input placeholder="请填写视频Id" :style="{ flex: 1 }" v-model:value="Bilibili.value" />
            <a-button type="success" @click="InsteBilibili">添加</a-button>
        </a-input-group>
    </a-modal>
</template>
<script lang="ts" setup>
import { message, type UploadFile } from 'ant-design-vue';

import type { FormProps } from "ant-design-vue"
import { getCategories } from "@/apis/categorie";
import { NormalToolbar, MdEditor } from 'md-editor-v3';
import type { ExposeParam, ToolbarNames } from "md-editor-v3"

import confetti from "canvas-confetti"
import { type PostBody, setPost, type setPostParams } from '@/apis/post';
import { uploaderFile } from '@/apis/file';

const route = useRoute()
const router = useRouter()
const showSuccess = ref(false)
const editorRef = ref<ExposeParam>();
const toolbar: ToolbarNames[] =
    [
        'bold',
        'underline',
        'italic',
        '-',
        'title',
        'strikeThrough',
        'sub',
        'sup',
        'quote',
        'unorderedList',
        'orderedList',
        'task',
        '-',
        'codeRow',
        'code',
        'link',
        'image',
        'table',
        'mermaid',
        'katex',
        '-',
        'revoke',
        'next',
        0,
        '=',
        'preview',
        'catalog',
    ];
const showCheckBilibili = ref(false)
const BilibiliOption = [{ label: "BV号", value: 'bv', }, { label: "AV号", value: "av" }]
const Bilibili = reactive({
    value: "",
    type: ""
})
const categories = ref<Categorie[]>([])
const post = ref<PostBody>()
const rules: FormProps["rules"] = {
    categorieId: [{
        type: "number",
        message: "请选择一级分区",
        required: true,
        trigger: ['blur'],
    }]
}
const headerImages = ref<UploadFile[]>([])

const form = reactive<setPostParams>({
    categoryId: [null, null],
    title: "",
    content: "",
    isMONFVote: false,
    headerImage: "",
})
function InsteBilibili() {
    if (!Bilibili.type) { message.warning("请选择av或bv号"); return }
    if (!Bilibili.value) { message.warning("请输入av或bv号"); return }
    const params: string[] = []
    params.push(`${Bilibili.type}id="${Bilibili.value}"`)
    editorRef.value?.insert(() => ({
        targetValue: `<mug-bilibili ${params.join(" ")}></mug-bilibili>`,
        select: false,
        deviationStart: 0,
        deviationEnd: 0
    }));
    showCheckBilibili.value = false
}
async function onUploadImg(files: File[], callback: (urls: string[]) => void) {
    const arr: string[] = []
    for (const iterator of files) {
        const { data } = await uploaderFile(iterator);
        arr.push(data.UploadFileUrl)
    }
    callback(arr)
}

async function addBilibili() {
    showCheckBilibili.value = true
}

async function loadCategories() {
    const res = await getCategories()
    categories.value = res.data.categories
}

loadCategories()
const categorieOneOptions = computed(() => {
    return categories.value.map(e => ({
        label: e.name,
        value: e.id,
    }))
});

const categorieTwoOptions = computed(() => {
    const categorieId = form.categoryId[0];
    if (!categorieId) return [];
    const item = categories.value.find(e => e.id === categorieId);
    if (!item) return []
    if (!("children" in item) || !Array.isArray(item.children)) item.children = []
    return item.children.map(e => ({
        label: e.name,
        value: e.id
    }))
})
function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

async function sendPost() {
    if (headerImages.value.length > 0) {
        form.headerImage = (await getUploadAction(headerImages.value)).join("")
    }
    if (!form.title) throw new Error("未填写标题");
    if (!form.content) throw new Error("缺少内容");
    if (form.content.length < 20) throw new Error("文章字数应不少于20");
    const body = { ...form };
    console.log(body)
    const hide = message.loading("发布中", 0)
    try {
        const result = await setPost(body);
        post.value = result
        // closeToast(true);
        confetti({
            angle: randomInRange(100, 120),
            spread: randomInRange(50, 80),
            particleCount: randomInRange(50, 100),
            origin: { y: 1, x: 1 }
        });
        confetti({
            angle: randomInRange(40, 90),
            spread: randomInRange(50, 80),
            particleCount: randomInRange(50, 100),
            origin: { y: 1, x: 0 }
        });
        await nextTick();
        showSuccess.value = true

    } catch (error) {
        // closeToast(true)
        if (error instanceof Error) {
            hide()
            message.error(error.message)
        }
    }
}

</script>
<style lang="less" scoped>
.creator {
    width: 100%;
    min-height: 100%;

    &-header {
        height: 60px;
    }
}

.BilibiliModel {
    max-width: 80%;
    width: 440px;
    padding: 24px;
    background-color: #FFFFFF;
    border-radius: 8px;
}

.right {
    margin-right: auto;
    margin-left: 16px;
    width: 430px;

    .right-form-item {
        flex: 1;

    }

    .right-form-item:first-child {
        margin-right: 24px;
    }
}

.card-right {
    background-color: #fff;
    border-radius: 6px;
    padding: 20px 30px;
    margin-bottom: 14px;
    box-shadow: 0px 14px 56px -15px rgba(0, 0, 0, 0.1);

    .card-right-top {
        display: flex;
    }

    h2 {
        color: var(--mug-text);
        font-size: 22px;
        margin-bottom: 16px;
    }
}

.card {
    // background-color: var(--mug-card-bg);
    border-radius: 6px;
    color: var(--mug-text);
    overflow: hidden;
    max-width: 1200px;
    height: 100%;
    width: 100%;
    flex: 1;
    margin-bottom: 16px;
    margin-left: auto;

    :deep(.categoriesPopop) {

        &::-webkit-scrollbar {
            display: none;
        }
    }
}

.titleInput {
    font-size: 26px;
    border: none;
    padding: 20px 20px 13px;
    width: 100%;
    background-color: #fff;
}


.successCard {
    display: flex;
    flex-direction: column;
    padding: 32px;
    max-width: calc(100vw - 32px);

    p {}

    h3 {
        font-size: 24px;
        font-weight: 400;
        color: var(--mug-text);
        text-align: center;
        margin-bottom: 16px;
    }

    &-footer {
        display: flex;
        margin: 20px 16px 0;
        justify-content: space-between;

        button {
            width: 48%;
        }
    }
}

.Editor {
    flex: 1;
}
</style>
