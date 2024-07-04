
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




export async function getPosts(params: PostParams) {
    return await request.Get<InstanceBody<PostsBody>>(`post`, {
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
    )
}