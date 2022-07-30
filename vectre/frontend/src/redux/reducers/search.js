import {
    STORE_SEARCHED_USERS,
    DO_FOLLOW_SEARCHED_USER,
    DO_UNFOLLOW_SEARCHED_USER,

    STORE_SEARCHED_COMMUNITIES,
    DO_JOIN_SEARCHED_COMMUNITY,
    DO_LEAVE_SEARCHED_COMMUNITY,

    STORE_SEARCHED_POSTS,
    CLEAR_SEARCHED_POSTS,
    DO_LIKE_SEARCHED_POST,
    DO_UNLIKE_SEARCHED_POST,

    USERS_COMMUNITIES_FILTER,
    STORE_SEARCHED_USERS_COMMUNITIES_FILTER,
    POSTS_SORT_TYPE,
    STORE_SEARCHED_POSTS_SORT_TYPE,
} from "../constants/search";

const initialState = {
    users: [],
    communities: [],
    posts: [],

    postsIndex: 0,
    postsPaginationComplete: false,

    usersCommunitiesFilter: USERS_COMMUNITIES_FILTER.ALL,
    postsSortType: POSTS_SORT_TYPE.LIKES
}

const search = (state = initialState, action) => {
    switch (action.type) {
        case STORE_SEARCHED_USERS:
            return {
                ...state,
                users: action.searchedUsers
            }
        case DO_FOLLOW_SEARCHED_USER:
            return {
                ...state,
                users: state.users.map((user, i) => user.walletAddress === action.walletAddress ? { ...user, alreadyFollowed: true, followerCount: user.followerCount + 1 } : user)
            }
        case DO_UNFOLLOW_SEARCHED_USER:
            return {
                ...state,
                users: state.users.map((user, i) => user.walletAddress === action.walletAddress ? { ...user, alreadyFollowed: false, followerCount: user.followerCount - 1 } : user)
            }
        case STORE_SEARCHED_COMMUNITIES:
            return {
                ...state,
                communities: action.searchedCommunities
            }
        case DO_JOIN_SEARCHED_COMMUNITY:
            return {
                ...state,
                communities: state.communities.map((com, i) => com.communityID === action.communityID ? { ...com, alreadyJoined: true, memberCount: com.memberCount + 1 } : com)
            }
        case DO_LEAVE_SEARCHED_COMMUNITY:
            return {
                ...state,
                communities: state.communities.map((com, i) => com.communityID === action.communityID ? { ...com, alreadyJoined: false, memberCount: com.memberCount - 1 } : com)
            }
        case STORE_SEARCHED_POSTS:
            var newSearchedPosts = [
                ...state.posts,
                ...action.searchedPosts
            ].filter((post, index, self) => index === self.findIndex((post2) => (post2.postID === post.postID))); // Filter duplicates based on postID

            return {
                ...state,
                posts: newSearchedPosts,
                postsIndex: newSearchedPosts.length,
                postsPaginationComplete: action.requestedSize !== action.searchedPosts.length
            }
        case CLEAR_SEARCHED_POSTS:
            return {
                ...state,
                posts: initialState.posts,
                postsIndex: initialState.postsIndex,
                postsPaginationComplete: initialState.postsPaginationComplete
            }
        case DO_LIKE_SEARCHED_POST:
            return {
                ...state,
                posts: state.posts.map((post, i) => post.postID === action.postID ? { ...post, likes: post.likes + 1, alreadyLiked: true } : post)
            }
        case DO_UNLIKE_SEARCHED_POST:
            return {
                ...state,
                posts: state.posts.map((post, i) => post.postID === action.postID ? { ...post, likes: post.likes - 1, alreadyLiked: false } : post)
            }
        case STORE_SEARCHED_USERS_COMMUNITIES_FILTER:
            const filter = Object.values(USERS_COMMUNITIES_FILTER).includes(action.filter) ? action.filter : state.usersCommunitiesFilter;
            return {
                ...state,
                usersCommunitiesFilter: filter
            }
        case STORE_SEARCHED_POSTS_SORT_TYPE:
            const sortType = Object.values(POSTS_SORT_TYPE).includes(action.sortType) ? action.sortType : state.postsSortType;
            return {
                ...state,
                postsSortType: sortType,

                // Clear searched posts if sort type changed
                posts: state.postsSortType !== sortType ? initialState.posts : state.posts,
                postsIndex: state.postsSortType !== sortType ? initialState.postsIndex : state.postsIndex,
                postsPaginationComplete: state.postsSortType !== sortType ? initialState.postsPaginationComplete : state.postsPaginationComplete
            }
        default:
            return state
    }
}

export default search