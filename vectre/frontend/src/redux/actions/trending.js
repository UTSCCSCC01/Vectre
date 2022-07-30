import {
    GET_TRENDING_COMMUNITIES,
    STORE_TRENDING_COMMUNITIES
} from "../constants/trending";

export const getTrendingCommunities = () => ({
    type: GET_TRENDING_COMMUNITIES,
})
export const storeTrendingCommunities = (trendingCommunities) => ({
    type: STORE_TRENDING_COMMUNITIES,
    trendingCommunities
})