import {
    STORE_POST,
    STORE_COMMENTS,
    POST_COMMENT,
    POST_LIKE,
    POST_UNLIKE
} from "../constants/posts";

const initialState = {
    post: {},
    comments: [],
    comment: {}
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
        case POST_COMMENT:
            return {
                ...state,
                comment: action.comment
            }
        case POST_LIKE:
            if (action.isComment) {
                return {
                    ...state,
                    comments: state.comments.map((comment, i) => comment.postID === action.postID ? { ...comment, likes: comment.likes + 1 } : comment)
                }
            }
            return {
                ...state,
                post: {
                    ...state.post,
                    likes: state.post.likes + 1
                }
            }
        case POST_UNLIKE:
            if (action.isComment) {
                return {
                    ...state,
                    comments: state.comments.map((comment, i) => comment.postID === action.postID ? { ...comment, likes: comment.likes - 1 } : comment)
                }
            }
            return {
                ...state,
                post: {
                    ...state.post,
                    likes: state.post.likes - 1
                }
            }
        default:
            return state
    }
}

export default posts