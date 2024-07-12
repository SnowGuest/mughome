import 'normalize.css'
import 'md-editor-v3/lib/style.css';
import './assets/main.css'
import 'virtual:uno.css';
import "bootstrap-icons/font/bootstrap-icons.min.css";
import 'md-editor-v3/lib/style.css';
import 'vue-waterfall-plugin-next/dist/style.css'

import { createI18n } from 'vue-i18n'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import NProgress from 'nprogress'
import App from './App.vue'
import router from './router'
import dayjs from 'dayjs/esm';
import date_zhCn from 'dayjs/esm/locale/zh-cn';
import localeData from 'dayjs/esm/plugin/localeData'
import relativeTime from "dayjs/esm/plugin/relativeTime";
import customParseFormat from "dayjs/esm/plugin/customParseFormat";
import isBetween from 'dayjs/esm/plugin/isBetween' // ES 2015
import { getUserSystemLanguage, preloadAppConf } from './utils';
import { getAllLanguage } from './lang';
import zhCn from './lang/zh-cn.json';



dayjs.extend(isBetween);
dayjs.extend(customParseFormat);
dayjs.locale(date_zhCn) // 全局使用
dayjs.extend(relativeTime)
dayjs.extend(localeData)
NProgress.configure({ showSpinner: false, minimum: 0.3 });

type MessageSchema = typeof zhCn;
const messages = getAllLanguage()
const i18n = createI18n<[MessageSchema], "zh-cn" | "en">({
    legacy: false,
    locale: getUserSystemLanguage(), // 设置地区
    fallbackLocale: getUserSystemLanguage(),
    messages,
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.mount('#root')