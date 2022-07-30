import {
    GET_TRENDING_USERS,
    GET_TRENDING_COMMUNITIES,
    STORE_TRENDING_USERS,
    STORE_TRENDING_COMMUNITIES,
    DO_FOLLOW_TRENDING_USER,
    DO_UNFOLLOW_TRENDING_USER,
    DO_JOIN_TRENDING_COMMUNITY,
    DO_LEAVE_TRENDING_COMMUNITY,
} from "../constants/trending";

export const getTrendingUsers = () => ({
    type: GET_TRENDING_USERS,
})
export const storeTrendingUsers = (trendingUsers) => ({
    type: STORE_TRENDING_USERS,
    trendingUsers
})
export const doFollowTrendingUser = (walletAddress) => ({
    type: DO_FOLLOW_TRENDING_USER,
    walletAddress
})
export const doUnfollowTrendingUser = (walletAddress) => ({
    type: DO_UNFOLLOW_TRENDING_USER,
    walletAddress
})


export const getTrendingCommunities = () => ({
    type: GET_TRENDING_COMMUNITIES,
})
export const storeTrendingCommunities = (trendingCommunities) => ({
    type: STORE_TRENDING_COMMUNITIES,
    trendingCommunities
})
export const doJoinTrendingCommunity = (communityID) => ({
    type: DO_JOIN_TRENDING_COMMUNITY,
    communityID
})
export const doLeaveTrendingCommunity = (communityID) => ({
    type: DO_LEAVE_TRENDING_COMMUNITY,
    communityID
})
