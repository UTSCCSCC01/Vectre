import {
    STORE_LOGIN_NONCE,
    STORE_USERS,
} from "../constants/users";

const initialState = {
    users: [],
    nonce: ""
}

const users = (state = initialState, action) => {
    switch (action.type) {
        case STORE_USERS:
            return {
                ...state,
                users: action.users
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