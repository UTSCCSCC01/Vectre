export const BASE_API_URL = "http://localhost:8080"

export const USERS = {
    GET_LOGIN_NONCE: "/users/login/nonce",
    LOGIN: "/users/login",
    GET_LOGGED_IN_USER: "/users/login/currentUser",

    GET_USERS: "/users",
    CREATE_USER: "/users/register",
    UPDATE_USER: "/users/{walletAddress}/update",

    FOLLOW_USER: "/users/{walletAddress}/follow",
    UNFOLLOW_USER: "/users/{walletAddress}/unfollow",

    GET_NOTIFICATIONS: "/users/{walletAddress}/notifications",
}

export const POSTS = {
    GET_POST: "/posts/{postID}",
    GET_COMMENTS: "/posts/{postID}/comments",
    POST_COMMENT: "/posts/{postID}/comment",
    POST_LIKE: "/posts/{postID}/like",
    POST_UNLIKE: "/posts/{postID}/unlike",
}

export const NOTIF = {
    READ_NOTIFICATION: "/notifications/{notificationID}/read"
}