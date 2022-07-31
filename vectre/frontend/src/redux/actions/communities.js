import {
    CREATE_COMMUNITY,
    GET_COMMUNITY,
    STORE_COMMUNITY,
    UPDATE_COMMUNITY,
    GET_ROLES_LOGGED_IN_USER,
    STORE_ROLES_LOGGED_IN_USER,
    JOIN_COMMUNITY,
    LEAVE_COMMUNITY,
    MODERATION,
    GET_BANNED_USERS,
    GET_MODERATORS,
    STORE_BANNED_USERS,
    STORE_MODERATORS,
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

export const getBannedUsers = (communityID, callBack) => ({
    type: GET_BANNED_USERS,
    communityID,
    callBack
})
export const getModerators = (communityID, callBack) => ({
    type: GET_MODERATORS,
    communityID,
    callBack
})

export const storeBannedUsers = (bannedUsers) => ({
    type: STORE_BANNED_USERS,
    bannedUsers
})
export const storeModerators = (moderators) => ({
    type: STORE_MODERATORS,
    moderators
})

export const joinCommunity = (communityID, callBack) => ({
    type: JOIN_COMMUNITY,
    communityID,
    callBack
})
export const leaveCommunity = (communityID, callBack) => ({
    type: LEAVE_COMMUNITY,
    communityID,
    callBack
})

// Moderation
export const promoteMember = (communityID, walletAddress, redirectWindow) => ({
    type: MODERATION.PROMOTE_MEMBER,
    communityID,
    walletAddress,
    redirectWindow
})
export const banMember = (communityID, walletAddress, redirectWindow) => ({
    type: MODERATION.BAN_MEMBER,
    communityID,
    walletAddress,
    redirectWindow
})
export const unbanMember = (communityID, walletAddress, redirectWindow) => ({
    type: MODERATION.UNBAN_MEMBER,
    communityID,
    walletAddress,
    redirectWindow
})
export const deletePostAsModerator = (communityID, postID, redirectWindow) => ({
    type: MODERATION.DELETE_POST,
    communityID,
    postID,
    redirectWindow
})