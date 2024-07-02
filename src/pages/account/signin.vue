<script lang="ts" setup>
const formState = reactive({
    account: "",
    password: "",
    isRemember: true
});

function submit(){
    
}
</script>

<template>
    <div class="signin relative flex items-center">
        <div class="formModel ">
            <h2 class="title">欢迎回来!</h2>
            <h3 class="sub-title">希望你喜欢音柚窝</h3>
            <a-form :model="formState" @submit="submit">
                <a-form-item>
                    <a-input v-model:value="formState.account" placeholder="用户名/邮箱"></a-input>
                </a-form-item>
                <a-form-item>
                    <a-input v-model:value="formState.password" type="password" placeholder="密码"></a-input>
                </a-form-item>
                <div>
                    未登录手机号验证后将自动注册登录， 注册即表明你已同意用户协议和隐私政策
                </div>
                <a-form-item>
                    <a-button block type="primary" htmlType="submit">登录/注册</a-button>
                </a-form-item>
            </a-form>
        </div>
        <img src="@/assets/images/love.png" draggable="false" class="mylove" alt="">
    </div>
</template>

<style scoped>
.signin {
    overflow: hidden;
    flex: 1;
    background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
    padding-left: 100px;
}

@media screen and (max-width:1000px) {
    .signin {
        padding-left: 14px;
        justify-content: center;
    }

    .mylove {
        display: none;
    }

    .formModel {}
}

.formModel {
    height: 500px;
    min-width: 400px;
    width: 400px;
    background-color: #ffffff;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 28px 28px 100px #cecece,
        -28px -28px 100px #f2f2f2;
}

.title {
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
}

.sub-title {
    color: #cecece;
    font-size: 14px;
    text-align: center;
    margin-bottom: 20px;
}
</style>