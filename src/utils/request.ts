import axios, { isAxiosError } from "axios"
import { useAppStore } from "@/stores/app"
import { useDebounceFn } from '@vueuse/core'
import { Message } from "element-ui"
const instance = axios.create({
    baseURL: import.meta.env.VITE_REQUEST_BASE_URL,
    timeout: 10000,
});


/**
 * @description 根请求
 * @param {*} conf 
 * */
export async function request(conf, errorCode = {}) {
    const app = useAppStore();
    const newConf = {
        ...conf, header: {
            ...conf.header,
            token: app.token
        }
    }
    const showGlobaMessage = useDebounceFn((str) => {
        Message.error(str)
    }, 2000)

    try {
        const result = await instance(newConf);
        if (errorCode[result.data.code]) {
            Message.error(errorCode[result.data.code])
        }
        if(result.data) return result.data
        else throw false
    } catch (error) {
        console.log(error)
        let message = ""
        if (isAxiosError(error)) {
            message = error.message
        } else if (typeof message === "string") {
            message = error
        }
        if (message) {
            showGlobaMessage(message)
        }
    }
}