import {
    STORE_BANNED_USERS,
    STORE_COMMUNITY,
    STORE_MODERATORS,
    STORE_ROLES_LOGGED_IN_USER
} from "../constants/communities";

const initialState = {
    community: {},
    loggedInUserRoles: [],
    bannedUsers: [],
    moderators: []
}

const communities = (state = initialState, action) => {
    switch (action.type) {
        case STORE_COMMUNITY:
            return {
                ...state,
                community: action.community
            }
        case STORE_ROLES_LOGGED_IN_USER:
            return {
                ...state,
                loggedInUserRoles: action.roles
            }
        case STORE_BANNED_USERS:
            return {
                ...state,
                bannedUsers: action.bannedUsers
            }
        case STORE_MODERATORS:
            return {
                ...state,
                moderators: action.moderators
            }
        default:
            return state
    }
}

export default communities