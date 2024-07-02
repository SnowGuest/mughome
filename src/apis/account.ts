import request from "@/utils/request";



export function login(reqBody: Record<string, any>) {
    return request.Post<InstanceBody<{
        user: User,
        token: Token
    }>>("/account/login", reqBody)
}