import {
    STORE_TRENDING_USERS,
    STORE_TRENDING_COMMUNITIES,
    DO_JOIN_TRENDING_COMMUNITY,
    DO_LEAVE_TRENDING_COMMUNITY,
    DO_FOLLOW_TRENDING_USER,
    DO_UNFOLLOW_TRENDING_USER,
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
        case DO_FOLLOW_TRENDING_USER:
            return {
                ...state,
                users: state.users.map((user, i) => user.walletAddress === action.walletAddress ? { ...user, alreadyFollowed: true, followerCount: user.followerCount + 1 } : user)
            }
        case DO_UNFOLLOW_TRENDING_USER:
            return {
                ...state,
                users: state.users.map((user, i) => user.walletAddress === action.walletAddress ? { ...user, alreadyFollowed: false, followerCount: user.followerCount - 1 } : user)
            }
        case STORE_TRENDING_COMMUNITIES:
            return {
                ...state,
                communities: action.trendingCommunities
            }
        case DO_JOIN_TRENDING_COMMUNITY:
            return {
                ...state,
                communities: state.communities.map((com, i) => com.communityID === action.communityID ? { ...com, alreadyJoined: true, memberCount: com.memberCount + 1 } : com)
            }
        case DO_LEAVE_TRENDING_COMMUNITY:
            return {
                ...state,
                communities: state.communities.map((com, i) => com.communityID === action.communityID ? { ...com, alreadyJoined: false, memberCount: com.memberCount - 1 } : com)
            }
        default:
            return state
    }
}

export default trending