import { createAlova } from 'alova';
import fetchAdapter from 'alova/fetch';
import VueHook from 'alova/vue';

const alovaInstance = createAlova({
    requestAdapter: fetchAdapter(),
    statesHook: VueHook,
    baseURL:import.meta.env.VITE_REQUEST_BASE_URL,
    timeout: 10000,
    beforeRequest(method) {
        method.config.headers.token = 'token';
    }
});

export default alovaInstance