import {
    SHOW_LOADING
} from "../constants/loading";

const initialState = {
    loading: false
}

const loading = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_LOADING:
            return {
                ...state,
                loading: action.bool
            }
        default:
            return state
    }
}

export default loading