import {
    STORE_COMMUNITY
} from "../constants/community";

const initialState = {
    community: {}
}

const community = (state = initialState, action) => {
    switch (action.type) {
        case STORE_COMMUNITY:
            return {
                ...state,
                community: action.community
            }
        default:
            return state
    }
}

export default community