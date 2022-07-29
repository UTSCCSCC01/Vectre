import {
    SEARCH_USERS,
    STORE_SEARCHED_USERS,
    DO_FOLLOW_SEARCHED_USER,
    DO_UNFOLLOW_SEARCHED_USER,

    SEARCH_COMMUNITIES,
    STORE_SEARCHED_COMMUNITIES,
    DO_JOIN_SEARCHED_COMMUNITY,
    DO_LEAVE_SEARCHED_COMMUNITY,

    SEARCH_POSTS,
    STORE_SEARCHED_POSTS,
    CLEAR_SEARCHED_POSTS,
    DO_LIKE_SEARCHED_POST,
    DO_UNLIKE_SEARCHED_POST, STORE_SEARCHED_POSTS_SORT_TYPE, STORE_SEARCHED_USERS_COMMUNITIES_FILTER,
} from "../constants/search";


export const searchUsers = (searchVal) => ({
    type: SEARCH_USERS,
    searchVal
})
export const storeSearchedUsers = (searchedUsers) => ({
    type: STORE_SEARCHED_USERS,
    searchedUsers
})
export const doFollowSearchedUsers = (walletAddress) => ({
    type: DO_FOLLOW_SEARCHED_USER,
    walletAddress
})
export const doUnfollowSearchedUsers = (walletAddress) => ({
    type: DO_UNFOLLOW_SEARCHED_USER,
    walletAddress
})

export const searchCommunities = (searchVal) => ({
    type: SEARCH_COMMUNITIES,
    searchVal
})
export const storeSearchedCommunities = (searchedCommunities) => ({
    type: STORE_SEARCHED_COMMUNITIES,
    searchedCommunities
})
export const doJoinSearchedCommunities = (communityID) => ({
    type: DO_JOIN_SEARCHED_COMMUNITY,
    communityID
})
export const doLeaveSearchedCommunities = (communityID) => ({
    type: DO_LEAVE_SEARCHED_COMMUNITY,
    communityID
})

export const searchPosts = (searchVal, searchedPostsIndex, sortType) => ({
    type: SEARCH_POSTS,
    searchVal,
    searchedPostsIndex,
    sortType
})
export const storeSearchedPosts = (searchedPosts, requestedSize) => ({
    type: STORE_SEARCHED_POSTS,
    searchedPosts,
    requestedSize
})
export const clearSearchedPosts = () => ({
    type: CLEAR_SEARCHED_POSTS
})
export const doLikeSearchedPost = (postID) => ({
    type: DO_LIKE_SEARCHED_POST,
    postID
})
export const doUnlikeSearchedPost = (postID) => ({
    type: DO_UNLIKE_SEARCHED_POST,
    postID
})

export const storeSearchedUsersCommunitiesFilter = (sortType) => ({
    type: STORE_SEARCHED_USERS_COMMUNITIES_FILTER,
    sortType
})
export const storeSearchedPostsSortType = (sortType) => ({
    type: STORE_SEARCHED_POSTS_SORT_TYPE,
    sortType
})