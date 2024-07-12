
declare global {


    interface MonfApplyMember {
        memberName: string,
        memberJob: string,
        memberMalodyUID?: number,
    }
    interface Monf {
        bilibiliLink: string;
        chartScoreAvg: number;
        chartScoreCount: number;
        chartScoreTotal: number;
        createdDate: string;
        createdUserId: number;
        id: number;
        intro: string;
        malodySID: number;
        likeCount: number;
        members: MonfApplyMember[];
        musicScoreAvg: number;
        musicScoreCount: number;
        musicScoreTotal: number;
        session: string;
        songName: string;
        teamName: string;
        rank: string;
        isHidden?: boolean;
        isLiked?: boolean;
        lastCommentDate: string;
        averageScore?: string;
        score: string;
        relations: {
            isLiked?: boolean;
            scoredCommentId?: number;
        }

    }
    interface MonfComment {
        id: number,
        comment: string,
        createdUserId: number,
        createdDate: string,
        workId: number,
        isSlashed: boolean,
        slashReason: string,
        slashedDate: string,
        slashedUserId: string,
        musicScore: number,
        chartScore: number,
        likeCount: number,
        relations?: {
            isLiked: boolean
        }
    }
}
export { } 