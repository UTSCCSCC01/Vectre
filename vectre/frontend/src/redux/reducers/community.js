import {
    STORE_COMMUNITY,
    STORE_COMMUNITY_FEED,
    STORE_COMMUNITY_FEED_SORT_TYPE,
    COMMUNITY_FEED_SORT_TYPE,
    STORE_ROLES_LOGGED_IN_USER
} from "../constants/community";

const initialState = {
    community: {},
    loggedInUserRoles: [],

    feed: [],
    feedIndex: 0,
    feedPaginationComplete: false,
    feedSortType: COMMUNITY_FEED_SORT_TYPE.TIMESTAMP
}

const community = (state = initialState, action) => {
    switch (action.type) {
        case STORE_COMMUNITY:
            return {
                ...state,
                community: action.community
            }
        case STORE_COMMUNITY_FEED:
            const newFeed = [
                ...state.feed,
                ...action.posts
            ].filter((post, index, self) => index === self.findIndex((post2) => (post2.postID === post.postID))); // Filter duplicates based on postID

            return {
                ...state,
                feed: newFeed,
                feedIndex: newFeed.length,
                feedPaginationComplete: action.requestedSize !== action.posts.length
            }
        case STORE_COMMUNITY_FEED_SORT_TYPE:
            const sortType = Object.values(COMMUNITY_FEED_SORT_TYPE).includes(action.sortType) ? action.sortType : state.feedSortType;
            return {
                ...state,
                feedSortType: sortType,

                // Clear feed if sort type changed
                feed: state.feedSortType !== sortType ? initialState.feed : state.feed,
                feedIndex: state.feedSortType !== sortType ? initialState.feedIndex : state.feedIndex,
                feedPaginationComplete: state.feedSortType !== sortType ? initialState.feedPaginationComplete : state.feedPaginationComplete
            }
        case STORE_ROLES_LOGGED_IN_USER:
            return {
                ...state,
                loggedInUserRoles: action.roles
            }
        default:
            return state
    }
}

export default community