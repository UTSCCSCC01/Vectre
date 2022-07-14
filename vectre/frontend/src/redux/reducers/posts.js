import {
    STORE_POST,
    STORE_COMMENTS,
    DO_LIKE,
    DO_UNLIKE, 
    UPLOAD_DATE_ASC,
    UPDATE_SORTING
} from "../constants/posts";

const initialState = {
    post: {},
    comments: [], 

    feedSorting: UPLOAD_DATE_ASC, 
}

const posts = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SORTING: 
            return {
                ...state, 
                feedSorting: action.feedSorting
            }

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
        case DO_LIKE:
            if (action.isComment) {
                return {
                    ...state,
                    comments: state.comments.map((comment, i) => comment.postID === action.postID ? { ...comment, likes: comment.likes + 1, alreadyLiked: true } : comment)
                }
            }
            return {
                ...state,
                post: {
                    ...state.post,
                    likes: state.post.likes + 1,
                    alreadyLiked: true
                }
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
                post: {
                    ...state.post,
                    likes: state.post.likes - 1,
                    alreadyLiked: false
                }
            }
        default:
            return state
    }
}

export default posts