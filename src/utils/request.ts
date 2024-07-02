import { createAlova } from 'alova';
import fetchAdapter from 'alova/fetch';
import VueHook from 'alova/vue';

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
    }
});

export default alovaInstance