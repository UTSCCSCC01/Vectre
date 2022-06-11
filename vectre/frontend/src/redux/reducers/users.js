import {
    STORE_USER,
    STORE_USERS,
    STORE_LOGGED_IN_USER,
    STORE_LOGIN_NONCE,
} from "../constants/users";

const initialState = {
    user: {},
    users: [],
    loggedInUser: {},
    nonce: ""
}

const users = (state = initialState, action) => {
    switch (action.type) {
        case STORE_USER:
            return {
                ...state,
                user: action.user
            }
        case STORE_USERS:
            return {
                ...state,
                users: action.users
            }
        case STORE_LOGGED_IN_USER:
            return {
                ...state,
                loggedInUser: action.loggedInUser
            }
        case STORE_LOGIN_NONCE:
            return {
                ...state,
                nonce: action.nonce
            }
        default:
            return state
    }
}

export default users