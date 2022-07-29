import {
    STORE_COMMUNITY,
    STORE_ROLES_LOGGED_IN_USER,
    STORE_SEARCHED_COMMUNITIES, STORE_TRENDING_COMMUNITIES
} from "../constants/communities";

const initialState = {
    community: {},
    loggedInUserRoles: [],
    searched: [],
    trending: [],
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
                searched: action.searchedCommunities
            }
        case STORE_TRENDING_COMMUNITIES:
            return {
                ...state,
                trending: action.trendingCommunities
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