interface User {
    /** @description {number} 用户邮箱 **/
    email: string;
    /** @description {number} 用户Id **/
    id: number;
    /** @description {string} 用户名 **/
    name: string;
    /** @description {string} 昵称 **/
    nickName: string;
    /** @description {number} 权限值 **/
    role: number;
    /** @description {string} 注册日期 **/
    createdDate: string;
    /** @description {string} 头像 **/
    avatarUrl?: string;
    /** @description {string} 积分 **/
    points: string;
    /** @description {string} 连续签到日期 **/
    continuousPunchCount: string;
    bio?: string,
    userCoverUrl?: string
    postCount: string;
    color?: string;
    followerCount: string;
    relations?: {
        /* 是否关注了此用户 */
        isSubscribed?: boolean;
    }

}
interface Token {
    value: string; // token
    exp: string; // 有效期
}

declare global {
    const User: User;
    const Token: Token
}

export { } 