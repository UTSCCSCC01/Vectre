export const BASE_API_URL = "http://localhost:8080"

export const USERS = {
    GET_LOGIN_NONCE: "/users/login/nonce",
    LOGIN: "/users/login",
    GET_LOGGED_IN_USER: "/users/login/currentUser",

    GET_USERS: "/users",
    CREATE_USER: "/users/register",
    UPDATE_USER: "/users/{walletAddress}/update",
    GET_NOTIFICATIONS: "/users/{walletAddress}/notifications"
}

export const NOTIF = {
    READ_NOTIFICATION: "/notifications/{notificationID}/read"
}