
import request from "@/utils/request";

export interface PostsBody {
    includes: {
        users: User[];
        // categories: Categorie[];
    };
    post: Post[];
}

export interface Pagination {
    page: string | number;
    pageSize: string | number;
}
export interface PostParams extends Pagination {
    postUserId?: number | string;
    sort?: string | number;
    content?: string;
    categorieId?: string | number;
}




export function getPosts(params: PostParams) {
    return request.Get<InstanceBody<PostsBody>>(`post`, {
        params,
        name: "getPosts"
    })
}



/**
 * @POST 点赞
 * @param id 帖子id
 * */
export async function postLike(id: Post["id"], cancel?: boolean) {
    return await request.Get<InstanceBody>(
        `like/post/${id}`,
        {
            params: { cancel },
            hitSource: ["getMonfs", "getPosts"]
        },
    ).send(true)
}



export interface PostBody {
    post: Post;
    includes: {
        categories: Categorie[];
        comments: Comment[];
        users: User[];
        // monfVoteInfos?: MonfVote[];
        // monfVoteDetails?: MonfVoteDetail[];
    };
}

export interface setPostParams {
    title: string;
    content: string;
    categoryId: (number | null)[];
    isMONFVote: boolean;
    headerImage?: string;
}
/**
 * @POST 发帖
 * @param title 帖子标题
 * */
export function setPost(data: setPostParams) {
    return request.Post<PostBody>(
        "post/publish",
        {
            data,
        },
        {
            meta: {
                errorCode: {
                    62: "发帖失败,请选择正确的分区",
                }
            }
        }
    ).send(true)
}
