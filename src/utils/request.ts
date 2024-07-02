import { createAlova } from 'alova';
import fetchAdapter from 'alova/fetch';
import VueHook from 'alova/vue';
import { message } from 'ant-design-vue';
const alovaInstance = createAlova({
    requestAdapter: fetchAdapter(),
    statesHook: VueHook,
    baseURL: import.meta.env.VITE_REQUEST_BASE_URL,
    timeout: 10000,
    cacheFor: {
        GET: {
            // 设置缓存模式为持久化模式
            mode: 'restore',
            expire: 60 * 10 * 1000 // 10分钟缓存
        },
        POST: {
            expire: 0 // post请求不设置缓存
        }
    },
    beforeRequest(method) {
        method.config.headers.token = 'token';
    },
    responded: {
        onSuccess: async (response, method) => {
            const json = await response.json();
            return json.data;
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