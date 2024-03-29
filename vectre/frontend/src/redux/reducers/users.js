import {
    STORE_USER,
    STORE_USERS,
    STORE_LOGGED_IN_USER,
    STORE_LOGIN_NONCE,
    STORE_NOTIFICATIONS,
    STORE_UNREADSTATUS,
    STORE_NFT,
    STORE_FUNDS,
    DO_JOIN_LOGGED_IN_USER_COMMUNITY,
    DO_LEAVE_LOGGED_IN_USER_COMMUNITY,
} from "../constants/users";

const initialState = {
    user: {},
    users: [],
    loggedInUser: {
        communities: []
    },
    nonce: "",
    notifications: [],
    unreadStatus: false,
    nft: [],
    funds: "",
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
        case STORE_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.notifications
            }
        case STORE_UNREADSTATUS:
            return {
                ...state,
                unreadStatus: action.unreadStatus
            }
        case STORE_NFT:
            return {
                ...state,
                nft: action.nft
            }
        case STORE_FUNDS:
            return {
                ...state,
                funds: action.funds
            }
        case DO_JOIN_LOGGED_IN_USER_COMMUNITY:
            return {
                ...state,
                loggedInUser: {
                    ...state.loggedInUser,
                    communities: state.loggedInUser.communities.map((com, i) => com.communityID === action.communityID ? { ...com, alreadyJoined: true } : com)
                }
            }
        case DO_LEAVE_LOGGED_IN_USER_COMMUNITY:
            return {
                ...state,
                loggedInUser: {
                    ...state.loggedInUser,
                    communities: state.loggedInUser.communities.map((com, i) => com.communityID === action.communityID ? { ...com, alreadyJoined: false } : com)
                }
            }
        default:
            return state
    }
}

export default users