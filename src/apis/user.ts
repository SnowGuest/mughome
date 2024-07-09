import request from "@/utils/request";



export async function getUser(id: number | string) {
    return await request.Get<InstanceBody<User>>(`/user/${id}`, {
        name: "getUser"
    })
}



/**
 * @description 关注用户
 * */

export function followUserApi(userId: string | number) {
    return request.Get<InstanceBody>(`/user/follow/${userId}`, {
        hitSource: ['getUser'],
        meta: {
            requiredLogin: true,
            errorCode: {
                13: "未找到此用户",
                34: "您不能关注您自己"

            }
        }
    });
}
export function unfollowUserApi(userId: string | number) {
    return request.Get<InstanceBody>(`/user/unfollow/${userId}`, {
        hitSource: ['getUser'],
        meta: {
            requiredLogin: true,
            errorCode: {
                "13": "未找到此用户"
            }
        }
    });
}