import {
    GET_COMMUNITY,
    STORE_COMMUNITY,
    GET_ROLES_LOGGED_IN_USER,
    STORE_ROLES_LOGGED_IN_USER,
    JOIN_COMMUNITY,
    LEAVE_COMMUNITY
} from "../constants/community";

export const getCommunity = (communityID) => ({
    type: GET_COMMUNITY,
    communityID
})
export const storeCommunity = (community) => ({
    type: STORE_COMMUNITY,
    community
})

export const getRolesOfLoggedInUser = (communityID, walletAddress) => ({
    type: GET_ROLES_LOGGED_IN_USER,
    communityID,
    walletAddress
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