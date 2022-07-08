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
    comments: []
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
            return {
                ...state,
                feed: action.posts,
                feedIndex: state.feedIndex + action.posts?.length
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