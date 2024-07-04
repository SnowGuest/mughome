
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
        isHidden?: boolean;
        isLiked?: boolean;
        lastCommentDate: string;
        relations?: {
            isLiked?: boolean;
            scoredCommentId?: number;
        }

    }
  
}
export { } 