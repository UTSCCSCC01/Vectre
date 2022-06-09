import {
    GET_LOGIN_NONCE,
    STORE_LOGIN_NONCE,
    LOGIN_USER,
    GET_USERS,
    STORE_USERS,
    CREATE_USER,
} from "../constants/users";

// Login
export const getLoginNonce = (wallet_address) => ({
    type: GET_LOGIN_NONCE,
    wallet_address
})
export const storeLoginNonce = (nonce) => ({
    type: STORE_LOGIN_NONCE,
    nonce
})
export const loginUser = (wallet_address, signedNonce, redirectWindow) => ({
    type: LOGIN_USER,
    wallet_address,
    signedNonce,
    redirectWindow
})

export const getUsers = () => ({
    type: GET_USERS
})

export const storeUsers = (users) => ({
    type: STORE_USERS,
    users
})

export const createUser = (user, redirectWindow) => ({
    type: CREATE_USER,
    user,
    redirectWindow
})