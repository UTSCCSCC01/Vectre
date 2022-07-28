import {
    STORE_COMMUNITY,
    STORE_ROLES_LOGGED_IN_USER,
    STORE_SEARCHED_COMMUNITIES,
    DO_FOLLOW_SEARCHED_COMMUNITY,
    DO_UNFOLLOW_SEARCHED_COMMUNITY
} from "../constants/communities";

const initialState = {
    community: {},
    searchedCommunities: [],
    loggedInUserRoles: []
}

const communities = (state = initialState, action) => {
    switch (action.type) {
        case STORE_COMMUNITY:
            return {
                ...state,
                community: action.community
            }
        case STORE_SEARCHED_COMMUNITIES:
            return {
                ...state,
                searchedCommunities: action.searchedCommunities
            }
        case DO_FOLLOW_SEARCHED_COMMUNITY:
            return {
                ...state,
                searchedCommunities: state.searchedCommunities.map((com, i) => com.communityID === action.communityID ? { ...com, alreadyJoined: true } : com)
            }
        case DO_UNFOLLOW_SEARCHED_COMMUNITY:
            return {
                ...state,
                searchedCommunities: state.searchedCommunities.map((com, i) => com.communityID === action.communityID ? { ...com, alreadyJoined: false } : com)
            }
        case STORE_ROLES_LOGGED_IN_USER:
            return {
                ...state,
                loggedInUserRoles: action.roles
            }
        default:
            return state
    }
}

export default communities