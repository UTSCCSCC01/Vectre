import {
    STORE_POST,
    STORE_COMMENTS,
    STORE_FEED,
    DO_LIKE,
    DO_UNLIKE
} from "../constants/posts";

const initialState = {
    post: {},
    feed: [],
    feedIndex: 0,
    comments: [],
    feedPaginationComplete: false
}

const posts = (state = initialState, action) => {
    switch (action.type) {
        case STORE_POST:
            return {
                ...state,
                post: action.post
            }
        case STORE_COMMENTS:
            return {
                ...state,
                comments: action.comments
            }
        case STORE_FEED:
            var newFeed = [
                ...state.feed,
                ...action.posts
            ].filter((post, index, self) => index === self.findIndex((post2) => (post2.postID === post.postID))) // Filter duplicates based on postID

            return {
                ...state,
                feed: newFeed,
                feedIndex: newFeed.length,
                feedPaginationComplete: action.requestedSize !== action.posts.length
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
                    post: {
                        ...state.post,
                        likes: state.post.likes + 1,
                        alreadyLiked: true
                    }
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
                    post: {
                        ...state.post,
                        likes: state.post.likes-1,
                        alreadyLiked: false
                    }
                }
            }
        default:
            return state
    }
}

export default posts