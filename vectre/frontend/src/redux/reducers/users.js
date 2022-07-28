import {
    STORE_USER,
    STORE_USERS,
    STORE_LOGGED_IN_USER,
    STORE_LOGIN_NONCE,
    STORE_NOTIFICATIONS,
    STORE_UNREADSTATUS,
    STORE_NFT,
    STORE_SEARCHED_USERS,
    DO_FOLLOW_SEARCHED_USER,
    DO_UNFOLLOW_SEARCHED_USER,
    STORE_FUNDS,
} from "../constants/users";

const initialState = {
    user: {},
    users: [],
    searchedUsers: [],
    loggedInUser: {},
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
        case STORE_SEARCHED_USERS:
            return {
                ...state,
                searchedUsers: action.searchedUsers
            }
        case DO_FOLLOW_SEARCHED_USER:
            return {
                ...state,
                searchedUsers: state.searchedUsers.map((user, i) => user.walletAddress === action.walletAddress ? { ...user, alreadyFollowed: true } : user)
            }
        case DO_UNFOLLOW_SEARCHED_USER:
            return {
                ...state,
                searchedUsers: state.searchedUsers.map((user, i) => user.walletAddress === action.walletAddress ? { ...user, alreadyFollowed: false } : user)
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
        default:
            return state
    }
}

export default users