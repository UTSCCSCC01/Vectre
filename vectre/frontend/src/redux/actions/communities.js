import {
    CREATE_COMMUNITY,
    GET_COMMUNITY,
    STORE_COMMUNITY,
    UPDATE_COMMUNITY,
    GET_ROLES_LOGGED_IN_USER,
    STORE_ROLES_LOGGED_IN_USER,
    JOIN_COMMUNITY,
    LEAVE_COMMUNITY,
    SEARCH_COMMUNITIES,
    STORE_SEARCHED_COMMUNITIES
} from "../constants/communities";

export const createCommunity = (community, redirectWindow) => ({
    type: CREATE_COMMUNITY,
    community,
    redirectWindow
})

export const getCommunity = (communityID) => ({
    type: GET_COMMUNITY,
    communityID
})
export const storeCommunity = (community) => ({
    type: STORE_COMMUNITY,
    community
})

export const searchCommunities = (searchVal) => ({
    type: SEARCH_COMMUNITIES,
    searchVal
})
export const storeSearchedCommunities = (searchedCommunities) => ({
    type: STORE_SEARCHED_COMMUNITIES,
    searchedCommunities
})

export const updateCommunity = (communityID, community, redirectWindow) => ({
    type: UPDATE_COMMUNITY,
    communityID,
    community,
    redirectWindow
})

export const getRolesOfLoggedInUser = (communityID) => ({
    type: GET_ROLES_LOGGED_IN_USER,
    communityID
})
export const storeRolesOfLoggedInUser = (roles) => ({
    type: STORE_ROLES_LOGGED_IN_USER,
    roles
})

export const joinCommunity = (communityID) => ({
    type: JOIN_COMMUNITY,
    communityID
})
export const leaveCommunity = (communityID) => ({
    type: LEAVE_COMMUNITY,
    communityID
})