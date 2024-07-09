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
        comments?: Comment[]
        categories?: Categorie[]
    }
}
interface MonfsParams extends PostParams {
    session?: "2023" | "2024"
}

/**
 * @GET 获取monf2023列表
 * */
export function getMonfs(params: MonfsParams) {
    return request.Get<InstanceBody<MonfListBody>>("/event/monf/work", {
        params,
        name: "getMonfs"
    })
}

/**
 * @GET monf点赞
 * */
export function monfLike(monfWorkId: string | number) {
    return request.Get<InstanceBody<MonfListBody>>(`/event/monf/work/${monfWorkId}/like`, {
        hitSource: ["getMonfs"],
        meta:{
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
        meta:{
            requiredLogin: true,
        }
    }).send(true)
}
