import {
    STORE_POST,
    STORE_COMMENTS,
    POST_COMMENT
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
        default:
            return state
    }
}

export default posts