import {
    FEED_SORT_TYPE,
    STORE_COMMUNITY_FEED,
    STORE_FEED,
    STORE_FEED_SORT_TYPE
} from "../constants/feed";
import {
    DO_LIKE,
    DO_UNLIKE
} from "../constants/posts";

const initialState = {
    feed: [],
    feedIndex: 0,
    feedPaginationComplete: false,
    feedSortType: FEED_SORT_TYPE.TIMESTAMP
}

const feed = (state = initialState, action) => {
    switch (action.type) {
        case STORE_FEED:
            var newFeed = [
                ...state.feed,
                ...action.posts
            ].filter((post, index, self) => index === self.findIndex((post2) => (post2.postID === post.postID))); // Filter duplicates based on postID

            return {
                ...state,
                feed: newFeed,
                feedIndex: newFeed.length,
                feedPaginationComplete: action.requestedSize !== action.posts.length
            }

        case STORE_COMMUNITY_FEED:
            var newFeed = [
                ...state.feed,
                ...action.posts
            ].filter((post, index, self) => index === self.findIndex((post2) => (post2.postID === post.postID))); // Filter duplicates based on postID

            return {
                ...state,
                feed: newFeed,
                feedIndex: newFeed.length,
                feedPaginationComplete: action.requestedSize !== action.posts.length
            }
        case STORE_FEED_SORT_TYPE:
            const sortType = Object.values(FEED_SORT_TYPE).includes(action.sortType) ? action.sortType : state.feedSortType;
            return {
                ...state,
                feedSortType: sortType,

                // Clear feed if sort type changed
                feed: state.feedSortType !== sortType ? initialState.feed : state.feed,
                feedIndex: state.feedSortType !== sortType ? initialState.feedIndex : state.feedIndex,
                feedPaginationComplete: state.feedSortType !== sortType ? initialState.feedPaginationComplete : state.feedPaginationComplete
            }
        case DO_LIKE:
            if (!action.isComment && action.fromFeed) {
                return {
                    ...state,
                    feed: state.feed.map((feedPost, i) => feedPost.postID === action.postID ? { ...feedPost, likes: feedPost.likes+1, alreadyLiked: true } : feedPost)
                }
            }
            return state
        case DO_UNLIKE:
            if (!action.isComment && action.fromFeed) {
                return {
                    ...state,
                    feed: state.feed.map((feedPost, i) => feedPost.postID === action.postID ? { ...feedPost, likes: feedPost.likes-1, alreadyLiked: false } : feedPost)
                }
            }
            return state
        default:
            return state
    }
}

export default feed