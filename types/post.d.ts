
declare global {

    interface Post {
        commentCount: number;
        content: string;
        createdDate: string;
        createdUserId: number;
        isHidden: boolean;
        likeCount: number;
        id: number | string;
        title: string;
        viewCount: number;
        introduction: string;
        monfVoteInfoId: string;
        headerImage?: string;
        relations: {
            MONFDetailVotedId?: number;
            MONFVoted?: boolean;
            categoryIds: [number, null | number];
            commentIds: [];
            commentEnd?: boolean;
            isLiked?: boolean;
            postLikeUserId: User["id"][];
        };
    }


}
export { } 