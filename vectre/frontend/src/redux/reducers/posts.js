import {
    STORE_POST,
    STORE_COMMENTS,
    STORE_FEED,
    STORE_FEED_SORT_TYPE,
    DO_LIKE,
    DO_UNLIKE,
    STORE_PROFILE_POSTS,
    FEED_SORT_TYPE,
} from "../constants/posts";

const initialState = {
    posts: [],
    comments: [],

    feed: [],
    feedIndex: 0,
    feedPaginationComplete: false,
    feedSortType: FEED_SORT_TYPE.TIMESTAMP
}

const posts = (state = initialState, action) => {
    switch (action.type) {
        case STORE_POST:
            return {
                ...state,
                posts: [action.post]
            }
        case STORE_COMMENTS:
            return {
                ...state,
                comments: action.comments
            }
        case STORE_FEED:
            const newFeed = [
                ...state.feed,
                ...action.posts
            ].filter((post, index, self) => index === self.findIndex((post2) => (post2.postID === post.postID))); // Filter duplicates based on postID

            return {
                ...state,
                feed: newFeed,
                feedIndex: newFeed.length,
                feedPaginationComplete: action.requestedSize !== action.posts.length
            }
        case STORE_FEED_SORT_TYPE:
            const sortType = Object.values(FEED_SORT_TYPE).includes(action.sortType) ? action.sortType : state.feedSortType;
            return {
                ...state,
                feedSortType: sortType,

                // Clear feed if sort type changed
                feed: state.feedSortType !== sortType ? initialState.feed : state.feed,
                feedIndex: state.feedSortType !== sortType ? initialState.feedIndex : state.feedIndex,
                feedPaginationComplete: state.feedSortType !== sortType ? initialState.feedPaginationComplete : state.feedPaginationComplete
            }
        case DO_LIKE:
            if (action.isComment) {
                return {
                    ...state,
                    comments: state.comments.map((comment, i) => comment.postID === action.postID ? { ...comment, likes: comment.likes+1, alreadyLiked: true } : comment)
                }
            } else if (action.fromFeed) {
                return {
                    ...state,
                    feed: state.feed.map((feedPost, i) => feedPost.postID === action.postID ? { ...feedPost, likes: feedPost.likes+1, alreadyLiked: true } : feedPost)
                }
            } else {
                return {
                    ...state,
                    posts: state.posts.map((post, i) => post.postID === action.postID ? { ...post, likes: post.likes + 1, alreadyLiked: true } : post)
                }
            }
        case DO_UNLIKE:
            if (action.isComment) {
                return {
                    ...state,
                    comments: state.comments.map((comment, i) => comment.postID === action.postID ? { ...comment, likes: comment.likes-1, alreadyLiked: false } : comment)
                }
            } else if (action.fromFeed) {
                return {
                    ...state,
                    feed: state.feed.map((feedPost, i) => feedPost.postID === action.postID ? { ...feedPost, likes: feedPost.likes-1, alreadyLiked: false } : feedPost)
                }
            } else {
                return {
                    ...state,
                    posts: state.posts.map((post, i) => post.postID === action.postID ? { ...post, likes: post.likes - 1, alreadyLiked: false } : post)
                }
            }
        case STORE_PROFILE_POSTS:
            return {
                ...state,
                posts: action.posts
            }
        default:
            return state
    }
}

export default posts