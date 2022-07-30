export const BASE_API_URL = "http://localhost:8080"

export const USERS = {
    GET_LOGIN_NONCE: "/users/login/nonce",
    LOGIN: "/users/login",
    GET_LOGGED_IN_USER: "/users/login/currentUser",

    GET_USERS: "/users",
    SEARCH_USERS: "/users/search/{searchVal}",
    CREATE_USER: "/users/register",
    UPDATE_USER: "/users/{walletAddress}/update",

    FOLLOW_USER: "/users/{walletAddress}/follow",
    UNFOLLOW_USER: "/users/{walletAddress}/unfollow",

    GET_NOTIFICATIONS: "/users/{walletAddress}/notifications",

    GET_NFT: "/users/{walletAddress}/nft",
    UPDATE_DASHBOARD: "/users/{walletAddress}/updateDashboard",
    GET_FUNDS: "/users/funds"
}

export const POSTS = {
    CREATE_POST: "/posts/create",
    GET_FEED: "/posts/feed",
    GET_POST: "/posts/{postID}",
    SEARCH_POSTS: "/posts/search/{searchVal}",
    CREATE_REPOST: "/posts/create",
    CREATE_COMMENT: "/posts/create/{postID}/comment",
    GET_COMMENTS: "/posts/{postID}/comments",
    POST_LIKE: "/posts/{postID}/like",
    POST_UNLIKE: "/posts/{postID}/unlike",
    GET_PROFILE_POSTS: "/users/{walletAddress}/posts",
}

export const NOTIF = {
    READ_NOTIFICATION: "/notifications/{notificationID}/read"
}

export const COMMUNITY = {
    CREATE_COMMUNITY: "/communities/create",
    GET_COMMUNITY: "/communities/{communityID}",
    GET_COMMUNITY_FEED: "/communities/{communityID}/feed",
    SEARCH_COMMUNITIES: "/communities/search/{searchVal}",
    UPDATE_COMMUNITY: "/communities/{communityID}/update",
    GET_ROLES_LOGGED_IN_USER: "/communities/{communityID}/members/{walletAddress}/roles",
    JOIN_COMMUNITY: "/communities/{communityID}/join",
    LEAVE_COMMUNITY: "/communities/{communityID}/leave",

    MODERATION: {
        PROMOTE_MEMBER: "/communities/{communityID}/promote/{walletAddress}",
        BAN_MEMBER: "/communities/{communityID}/ban/{walletAddress}",
        UNBAN_MEMBER: "/communities/{communityID}/unban/{walletAddress}"
    }
}