import {
    STORE_SEARCHED_USERS,
    DO_FOLLOW_SEARCHED_USER,
    DO_UNFOLLOW_SEARCHED_USER,

    STORE_SEARCHED_COMMUNITIES,
    DO_JOIN_SEARCHED_COMMUNITY,
    DO_LEAVE_SEARCHED_COMMUNITY,

    STORE_SEARCHED_POSTS,
    DO_LIKE_SEARCHED_POST,
    DO_UNLIKE_SEARCHED_POST,
} from "../constants/search";

const initialState = {
    users: [],
    communities: [],
    posts: []
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
                searchedUsers: state.searchedUsers.map((user, i) => user.walletAddress === action.walletAddress ? { ...user, alreadyFollowed: true } : user)
            }
        case DO_UNFOLLOW_SEARCHED_USER:
            return {
                ...state,
                searchedUsers: state.searchedUsers.map((user, i) => user.walletAddress === action.walletAddress ? { ...user, alreadyFollowed: false } : user)
            }
        case STORE_SEARCHED_COMMUNITIES:
            return {
                ...state,
                communities: action.searchedCommunities
            }
        case DO_JOIN_SEARCHED_COMMUNITY:
            return {
                ...state,
                communities: state.communities.map((com, i) => com.communityID === action.communityID ? { ...com, alreadyJoined: true } : com)
            }
        case DO_LEAVE_SEARCHED_COMMUNITY:
            return {
                ...state,
                communities: state.communities.map((com, i) => com.communityID === action.communityID ? { ...com, alreadyJoined: false } : com)
            }
        case STORE_SEARCHED_POSTS:
            return {
                ...state,
                posts: action.searchedPosts
            }
        case DO_LIKE_SEARCHED_POST:
            return {
                ...state,
                posts: state.posts.map((post, i) => post.postID === action.postID ? { ...post, likes: post.likes+1, alreadyLiked: true } : post)
            }
        case DO_UNLIKE_SEARCHED_POST:
            return {
                ...state,
                posts: state.posts.map((post, i) => post.postID === action.postID ? { ...post, likes: post.likes-1, alreadyLiked: false } : post)
            }
        default:
            return state
    }
}

export default search