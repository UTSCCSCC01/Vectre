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
}