import {
    GET_TRENDING_USERS,
    GET_TRENDING_COMMUNITIES,
    STORE_TRENDING_USERS,
    STORE_TRENDING_COMMUNITIES,
} from "../constants/trending";

export const getTrendingUsers = () => ({
    type: GET_TRENDING_USERS,
})
export const storeTrendingUsers = (trendingUsers) => ({
    type: STORE_TRENDING_USERS,
    trendingUsers
})

export const getTrendingCommunities = () => ({
    type: GET_TRENDING_COMMUNITIES,
})
export const storeTrendingCommunities = (trendingCommunities) => ({
    type: STORE_TRENDING_COMMUNITIES,
    trendingCommunities
})