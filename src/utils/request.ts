import { useAppStore } from '@/stores/app';
import { createAlova } from 'alova';
import fetchAdapter from 'alova/fetch';
import VueHook from 'alova/vue';
import { message } from 'ant-design-vue';
import { requestError2Message } from '.';
import { createClientTokenAuthentication } from 'alova/client';
import { refreshToken } from '@/apis/token';
import localforage from 'localforage';
const { onAuthRequired, onResponseRefreshToken } = createClientTokenAuthentication({
    refreshToken: {
        // 在请求前触发，将接收到method参数，并返回boolean表示token是否过期
        isExpired: method => {
            const appStore = useAppStore();
            if (appStore.token) {
                return Number(appStore.token.exp) + (2 * 60 * 1000) < Date.now();
            }
            return false
        },

        // 当token过期时触发，在此函数中触发刷新token
        handler: async method => {
            const appStore = useAppStore();
            try {
                const { data } = await refreshToken();
                appStore.token = data.token;
                localforage.setItem('token', data.token);
            } catch (error) {
                // appStore.loginOut()
                // localforage.clear();
                // const router = useRouter()
                // router
                // token刷新失败，跳转回登录页
                // location.href = '/login';
                // 并抛出错误
                throw error;
            }
        }
    }
});
console.log(fetchAdapter)
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
    beforeRequest: onAuthRequired((method) => {
        const appStore = useAppStore();
        console.log(method.meta, '走不走拦截')
        if (method.meta && "requiredLogin" in method.meta) {
            console.log(method.meta.requiredLogin, '是否要求必须登录')
        }
        if (method.meta && "requiredLogin" in method.meta && method.meta.requiredLogin && !appStore.signin) {
            message.warn("请先登录")
            throw Promise.reject()
        }

        if (appStore.signin) {
            method.config.headers.Authorization = `Bearer ${appStore.token?.value}`;
        }
    }),
    responded: onResponseRefreshToken({
        onSuccess: async (response, method) => {
            const json = await response.json();
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
    })
});

export default alovaInstance