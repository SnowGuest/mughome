import { requestError2Message } from "@/utils";
import request from "@/utils/request";



export async function login(reqBody: Record<string, any>) {
    return requestError2Message(await request.Post<InstanceBody<{
        user: User,
        token: Token
    }>>("/account/login", reqBody), {
        13: "该账号未注册",
        12: "用户名或者密码错误",
        21: "账号或密码错误",
        1001: "账号或密码错误"
    })


}