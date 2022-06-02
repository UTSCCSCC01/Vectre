import {
    GET_USER,
    STORE_USERS,
} from "../constants/users";

const initialState = {
    users: []
}

const users = (state = initialState, action) => {
    switch (action.type) {
        case STORE_USERS:
            return {
                ...state,
                users: action.users,
            }
        case GET_USER:
            return {
                ...state,
                users: action.users,
            }
        default:
            return state
    }
}

export default users