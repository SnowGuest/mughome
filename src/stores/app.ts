import localforage from 'localforage';
import { defineStore } from 'pinia'
import { ref } from 'vue'
import dayjs from 'dayjs';
import dayjsZhCn from 'dayjs/locale/zh-cn';
import dayjsEn from 'dayjs/locale/en';
import { getAllLanguageKey } from '@/lang';
import { getUserSystemLanguage } from '@/utils/index';
import { useI18n } from 'vue-i18n';
const dayjsKv = {
    "zh-cn": dayjsZhCn,
    "en": dayjsEn
}
const langKeys = getAllLanguageKey()
export const useAppStore = defineStore('app', () => {
    const language = ref<LangEnmu>(getUserSystemLanguage());
    const languageMode = ref<LangEnmuSelect>("auto");
    const { locale, t } = useI18n()
    const userInfo = ref<User>();
    const token = ref<Token>();
    const setting = ref<Setting>()
    const setLanguage = (lang: LangEnmu | null, langMode: LangEnmuSelect | null) => {
        const setLang: LangEnmu = lang && langKeys.includes(lang) ? lang : getUserSystemLanguage();
        console.log("用户电脑支持的语言", langKeys)
        languageMode.value = langMode && langMode !== "auto" && langKeys.includes(langMode) ? setLang : "auto";
        console.log("设置语言", setLang)
        locale.value = setLang
        if (dayjsKv[setLang]) dayjs.locale(dayjsKv[setLang])
        language.value = setLang;
        document.documentElement.setAttribute("lang", setLang)
        document.title = t("global.webSiteTitle");
        console.log(t("global.webSiteTitle"))
        localforage.setItem("language", setLang)
        localforage.setItem("languageMode", languageMode.value)
    }
    const setOrderSetting = (newSetting: Setting | null) => {
        if (newSetting) {
            setting.value = newSetting
            localforage.setItem("setting", setting.value)
        }
    }
    const signin = computed<boolean>(e =>
        Boolean(languageMode.value && language.value && userInfo.value && token.value && Date.now() < parseInt(`${token.value.exp}0000`))
    )
    const isSelf = (id: string|number) => {
        return signin.value && `${id}` === `${userInfo.value?.id}`
    }
    function loginOut() {
        localforage.clear()
        location.href = location.origin

    }
    return {
        language,
        languageMode,
        userInfo,
        token,
        setLanguage,
        setting,
        setOrderSetting,
        signin,
        loginOut,
        isSelf
    }
})