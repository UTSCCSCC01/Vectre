import {
    STORE_COMMENTS
} from "../constants/posts";

const initialState = {
    comments: []
}

const posts = (state = initialState, action) => {
    switch (action.type) {
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