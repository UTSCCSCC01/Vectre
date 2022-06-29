import {
    STORE_POST,
    STORE_COMMENTS
} from "../constants/posts";

const initialState = {
    post: {},
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
        default:
            return state
    }
}

export default posts