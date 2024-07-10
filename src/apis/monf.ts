import request from "@/utils/request";
import type { PostParams } from "./post";


export interface MonfApplyBody {
    work: Monf,
    includes: {
        users: User[]
        comments?: Comment[]
        categories?: Categorie[]
    }
}




interface MonfListBody {
    works: Monf[],
    includes: {
        users: User[]
        workComments?: Comment[]
        categories?: Categorie[]
    }
}

interface MonfBody {
    work: Monf,
    includes: {
        users: User[]
        workComments?: Comment[]
    }
}
export interface MonfsParams {
    session?: "2023" | "2024";
    postUserId?:string;
}

/**
 * @GET 获取monf列表
 * */
export function getMonfs(params: MonfsParams) {
    return request.Get<InstanceBody<MonfListBody>>("/event/monf/work", {
        params,
        name: "getMonfs"
    })
}

/**
 * @GET 获取monf
 * */
export function getMonf(workId: string | number) {
    return request.Get<InstanceBody<MonfBody>>(`/event/monf/work/${workId}`, {
        name: "getMonf"
    })
}


/**
 * @GET monf点赞
 * */
export function monfLike(monfWorkId: string | number) {
    return request.Get<InstanceBody<MonfListBody>>(`/event/monf/work/${monfWorkId}/like`, {
        hitSource: ["getMonfs"],
        meta: {
            requiredLogin: true,
        }
    }).send(true)
}

/**
 * @GET monf取消点赞
 * */
export function monfunLike(monfWorkId: string | number) {
    return request.Get<InstanceBody<MonfListBody>>(`/event/monf/work/${monfWorkId}/like`, {
        hitSource: ["getMonfs"],
        meta: {
            requiredLogin: true,
        }
    }).send(true)
}
