import {
    STORE_COMMUNITY,
    STORE_ROLES_LOGGED_IN_USER,
    STORE_SEARCHED_COMMUNITIES
} from "../constants/community";

const initialState = {
    community: {},
    searchedCommunities: [],
    loggedInUserRoles: []
}

const community = (state = initialState, action) => {
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
        case STORE_ROLES_LOGGED_IN_USER:
            return {
                ...state,
                loggedInUserRoles: action.roles
            }
        default:
            return state
    }
}

export default community