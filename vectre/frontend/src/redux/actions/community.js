import {
    CREATE_COMMUNITY,
    GET_COMMUNITY,
    STORE_COMMUNITY,
    UPDATE_COMMUNITY,
    GET_ROLES_LOGGED_IN_USER,
    STORE_ROLES_LOGGED_IN_USER,
    JOIN_COMMUNITY,
    LEAVE_COMMUNITY, GET_COMMUNITY_FEED, STORE_COMMUNITY_FEED
} from "../constants/community";

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

export const getCommunityFeed = (communityID, feedIndex, sortType) => ({
    type: GET_COMMUNITY_FEED,
    communityID,
    feedIndex,
    sortType
})
export const storeCommunityFeed = (posts, requestedSize) => ({
    type: STORE_COMMUNITY_FEED,
    posts,
    requestedSize
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