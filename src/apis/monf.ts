import request from "@/utils/request";


export interface MonfApplyBody {
    work: Monf,
    includes: {
        users: User[]
        comments?: MonfComment[]
        categories?: Categorie[]
    }
}

export interface MonfPublishParams {
    teamName: string,
    songName: string,
    malodySID: string,
    intro: string,
    members: MonfPublishMember[],
    bilibiliLink: string,
    session?: "2023" | "2024";
}
export interface MonfPublishMember {
    memberName: string,
    memberJob: string,
    memberMalodyUID?: number,
}


interface MonfListBody {
    works: Monf[],
    includes: {
        users: User[]
        workComments?: MonfComment[]
        categories?: Categorie[]
    }
}

interface MonfBody {
    work: Monf,
    includes: {
        users: User[]
        workComments?: MonfComment[]
    }
}
export interface MonfsParams {
    session?: "2023" | "2024";
    postUserId?: string;
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

interface MonfCommentsBody {
    workComments: MonfComment[];
    includes: {
        users: User[];
        categories: Categorie[];
        comments: [];
    }
}
interface CutOffTicketBody {
    workComment: MonfComment;
}
interface getMonfCommentsParams {
    workId: string | number;
}
/**
 * @GET 获取monf评论
 * */
export function getMonfComments(params: getMonfCommentsParams) {
    return request.Get<InstanceBody<MonfCommentsBody>>(`/event/monf/work/${params.workId}/comment`, {
        params,
    })
}
/**
 * @GET 削票
 * */
export function cutOffTicketAPI(workCommentId: string | number, reason: string) {
    return request.Get<InstanceBody<CutOffTicketBody>>(`/event/monf/comment/${workCommentId}/slash`, {
        params: {
            reason
        }
    }).send(true)
}

// monf更新评论
export function monfCommentUpdate(workCommentId: string | number, params: MonfCommentParams) {
    return request.Patch<InstanceBody<CutOffTicketBody>>(`/event/monf/comment/${workCommentId}`, params).send(true)
}
export interface MonfCommentParams {
    workId: number | string,
    comment: string,
    musicScore?: number,
    chartScore?: number
}
// monf评论
export function monfComment(params: MonfCommentParams) {
    return request.Post<InstanceBody<CutOffTicketBody>>(`/event/monf/comment/publish`, params).send(true)
}

// monf取消点赞
export function monfCommentunLike(monfWorkCommentId: string | number) {
    return request.Get<InstanceBody<CutOffTicketBody>>(`/event/monf/comment/${monfWorkCommentId}/unlike`, {
    }).send(true)
}
// monf点赞
export function monfCommentLike(monfWorkCommentId: string | number) {
    return request.Get<InstanceBody<CutOffTicketBody>>(`/event/monf/comment/${monfWorkCommentId}/like`, {
    }).send(true)
}

// monf发布
export function monfPublish(params: MonfPublishParams) {
    return request.Post<InstanceBody<MonfBody>>(`event/monf/work/publish`, params, {
        hitSource: ["getMonfs"],
    }).send(true)
}
