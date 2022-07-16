import {
    GET_FEED,
    GET_COMMUNITY_FEED,
    STORE_FEED,
    STORE_COMMUNITY_FEED,
    STORE_FEED_SORT_TYPE,
} from "../constants/feed";

export const getFeed = (feedIndex, sortType) => ({
    type: GET_FEED,
    feedIndex,
    sortType
})
export const storeFeed = (posts, requestedSize) => ({
    type: STORE_FEED,
    posts,
    requestedSize
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

export const storeFeedSortType = (sortType) => ({
    type: STORE_FEED_SORT_TYPE,
    sortType
})