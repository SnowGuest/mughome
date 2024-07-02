import { type Ref, ref } from "vue";
import { type LocationQueryRaw, useRoute, useRouter, type RouteLocation } from 'vue-router'

import localforage from "localforage";
import { useAppStore } from "../stores/app";
import { getAllLanguageKey } from "../lang";
// import browser from "browser-tool";
import { nextTick } from "vue";
// 在App.vue校验是否存在用户个人信息
export function preloadAppConf() {

    const showView = ref(false);
    // const router = useRouter();
    const route = useRoute();
    const appStore = useAppStore();
    const languageKeys = getAllLanguageKey()
    if (route.path === "/login") {
        showView.value = true
        return { showView }
    }
    // localforage 支持IE 优先IndexDB -> webSQL -> localStorage
    // Promise.all必定会走then 如果走catch 说明当前浏览器环境有问题故退回到登录页
    Promise.all([
        localforage.getItem<User>('userInfo'),
        localforage.getItem<Token>('token'),
        localforage.getItem<LangEnmu>('language'),
        localforage.getItem<LangEnmuSelect>('languageMode'),
        localforage.getItem<Setting>('setting'),
        // browser(),
        nextTick(),
    ]).then(e => {
        const [userInfo, token, language, languageMode, setting, browserInfo] = e;
        // console.log(browserInfo)
        // 查询当前缓存的语言是否存在应用支持App列表中 不存在恢复兜底语言
        appStore.setLanguage(language && languageKeys.includes(language) ? language : getUserSystemLanguage(), languageMode)

        if (userInfo && token) {
            appStore.token = token;
            appStore.userInfo = userInfo;
            appStore.setOrderSetting(setting)
            return
        } else {
            throw new Error("not Token and userInfo")
        }
    }).catch(err => {
        localforage.clear()
        // let query: LocationQueryRaw
        // if (["/", "/login"].includes(route.path)) {
        //     query = {
        //         redirect: route.path === '/' ? route.path :
        //     }
        // }
        // router.replace({
        //     name: "login",
        //     // query
        // })
    }).finally(() => {
        showView.value = true
    })
    return {
        showView
    }
}


// 二次校验权限
export function pagePermissionVerify(to: RouteLocation) {
    const appStore = useAppStore();
    if (appStore.language && appStore.userInfo && appStore.token) {
        return true
    } else {
        return { path: "noAuth", query: { redirect: to.path }}
    }
}

export function getUserSystemLanguage(): LangEnmu {
    // 获取当前支持的所有语言包 例子：["zh-cn","en"]
    const languageKey = getAllLanguageKey();
    // 获取当前用户电脑配置的语言转换成小写
    const userSystemLanguage = navigator.language.toLocaleLowerCase() as LangEnmu
    // includes判断元素是否在数组中，中国区用户肯定可以匹配到zh-cn
    // 非中国区用户就会匹配到 en
    return languageKey.includes(userSystemLanguage) ? userSystemLanguage : "en"
}

export function requestError2Message(){

}