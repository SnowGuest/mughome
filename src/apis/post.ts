
import request from "@/utils/request";

export interface PostsBody {
    includes: {
        users: User[];
        categories: Categorie[];
    };
    post: Post[];
}
export interface PostBody {
    includes: {
        users: User[];
        categories: Categorie[];
        comment: PostComment[];
    };
    post: Post;
}
export interface Pagination {
    page: string | number;
    pageSize: string | number;
}
export interface PostsParams extends Pagination {
    postUserId?: number | string;
    sort?: string | number;
    content?: string;
    categorieId?: string | number;
}

export interface PostParams extends Pagination {
    sortField?: "createdDate" | "likeCount",
    sortType?: "asc" | "desc",
    content?: string,
}



export function getPosts(params: PostsParams) {
    return request.Get<InstanceBody<PostsBody>>(`post`, {
        params,
        name: "getPosts"
    })
}
// 获取帖子详情
export function getPost(id: string | number, params?: PostParams) {
    return request.Get<InstanceBody<PostBody>>(`post/${id}`, {
        params,
        name: "getPost",
    }).send(true)
}
// 帖子列表和帖子详情共享一个配置
export const getPostComments = getPost;


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
