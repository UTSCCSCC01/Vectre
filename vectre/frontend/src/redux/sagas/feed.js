import { call, put, takeLatest } from "redux-saga/effects"
import { postRequest } from "./index";
import {
    BASE_API_URL,
    POSTS,
    COMMUNITY
} from "../constants/endpoints";
import {showLoading, showToast} from "../actions/global";
import { TOAST_STATUSES } from "../constants/global";
import { storeCommunityFeed, storeFeed } from "../actions/feed";
import { GET_COMMUNITY_FEED, GET_FEED } from "../constants/feed";

function* getFeed(action) {
    try {
        const defaultSize = 10
        const response = yield call(postRequest, BASE_API_URL + POSTS.GET_FEED, {
            start: action.feedIndex,
            size: defaultSize,
            sort: action.sortType
        }), responseData = response[1]
        if (responseData.success) {
            yield put(storeFeed(responseData.posts, defaultSize))
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
        yield put(showLoading(false))
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to get feed"))
        console.log(error)
    }
}

function* getCommunityFeed(action) {
    try {
        const defaultSize = 10
        const response = yield call(postRequest, BASE_API_URL + COMMUNITY.GET_COMMUNITY_FEED.replace("{communityID}", action.communityID), {
            start: action.feedIndex,
            size: defaultSize,
            sort: action.sortType
        }), responseData = response[1]
        if (responseData.success) {
            yield put(storeCommunityFeed(responseData.posts, defaultSize))
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to get feed"))
        console.log(error)
    }
}


function* feedSaga() {
    yield takeLatest(GET_FEED, getFeed)
    yield takeLatest(GET_COMMUNITY_FEED, getCommunityFeed)
}

export default feedSaga
