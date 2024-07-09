import request from "@/utils/request";



export async function refreshToken() {
    return await request.Get<InstanceBody<{ token: Token }>>(`/token/renew`, {
        name: "refreshToken",
        meta: {
            authRole: "refreshToken"
        }
    })
}
