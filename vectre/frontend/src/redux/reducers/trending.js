import {
    STORE_TRENDING_USERS,
    STORE_TRENDING_COMMUNITIES,
} from "../constants/trending";

const initialState = {
    users: [],
    communities: []
}

const trending = (state = initialState, action) => {
    switch (action.type) {
        case STORE_TRENDING_USERS:
            return {
                ...state,
                users: action.trendingUsers
            }
        case STORE_TRENDING_COMMUNITIES:
            return {
                ...state,
                communities: action.trendingCommunities
            }
        default:
            return state
    }
}

export default trending