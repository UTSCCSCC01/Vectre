import {
    STORE_TRENDING_COMMUNITIES
} from "../constants/trending";

const initialState = {
    // users: [],
    communities: []
}

const trending = (state = initialState, action) => {
    switch (action.type) {
        case STORE_TRENDING_COMMUNITIES:
            return {
                ...state,
                communities: action.trendingCommunities.slice(0, 4)
            }
        default:
            return state
    }
}

export default trending