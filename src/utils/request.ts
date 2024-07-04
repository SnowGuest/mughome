import { useAppStore } from '@/stores/app';
import { createAlova } from 'alova';
import fetchAdapter from 'alova/fetch';
import VueHook from 'alova/vue';
import { message } from 'ant-design-vue';
import { requestError2Message } from '.';
const alovaInstance = createAlova({
    requestAdapter: fetchAdapter(),
    statesHook: VueHook,
    baseURL: import.meta.env.VITE_REQUEST_BASE_URL,
    timeout: 10000,
    cacheFor: {
        GET: {
            expire: 60 * 10 * 1000 // 10分钟缓存
        },
        POST: {
            expire: 0 // post请求不设置缓存
        }
    },
    beforeRequest(method) {
        const appStore = useAppStore();
        if (appStore.signin) {
            method.config.headers.Authorization  = `Bearer ${appStore.token?.value}`;
        }
    },
    responded: {
        onSuccess: async (response, method) => {
            const json = await response.json();
            console.log(method.meta)
            if (method.meta?.errorCode) {
                requestError2Message(json, method.meta.errorCode)
            }
            return json;
        },

        // 请求失败的拦截器
        // 请求错误时将会进入该拦截器。
        // 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
        onError: (err, method) => {
            message.error("服务器异常，请稍后重试")
        },
    }
});

export default alovaInstance