import {
    STORE_POST,
    STORE_COMMENTS,
    DO_LIKE,
    DO_UNLIKE,
    STORE_PROFILE_POSTS,
} from "../constants/posts";

const initialState = {
    comments: [],
    posts: []
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
        case DO_LIKE:
            if (action.isComment) {
                return {
                    ...state,
                    comments: state.comments.map((comment, i) => comment.postID === action.postID ? { ...comment, likes: comment.likes + 1, alreadyLiked: true } : comment)
                }
            }
            return {
                ...state,
                posts: state.posts.map((post, i) => post.postID === action.postID ? { ...post, likes: post.likes + 1, alreadyLiked: true } : post)
            }
        case DO_UNLIKE:
            if (action.isComment) {
                return {
                    ...state,
                    comments: state.comments.map((comment, i) => comment.postID === action.postID ? { ...comment, likes: comment.likes - 1, alreadyLiked: false } : comment)
                }
            }
            return {
                ...state,
                posts: state.posts.map((post, i) => post.postID === action.postID ? { ...post, likes: post.likes - 1, alreadyLiked: false } : post)
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