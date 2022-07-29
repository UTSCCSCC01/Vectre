import { call, put, takeLatest } from "redux-saga/effects"
import { getRequest, postRequest, putRequest } from "./index";
import {
    BASE_API_URL,
    USERS,
    COMMUNITY,
    POSTS,
} from "../constants/endpoints";
import { showLoading, showToast } from "../actions/global";
import { TOAST_STATUSES } from "../constants/global";
import {
    SEARCH_COMMUNITIES,
    SEARCH_POSTS,
    SEARCH_USERS,
} from "../constants/search";
import {
    storeSearchedUsers,
    storeSearchedCommunities,
    storeSearchedPosts
} from "../actions/search";

function* searchUsers(action) {
    try {
        const response = yield call(getRequest, BASE_API_URL + USERS.SEARCH_USERS.replace("{searchVal}", action.searchVal)), responseData = response[1]
        if (responseData.success) {
            yield put(storeSearchedUsers(responseData.users))
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to search users"))
        console.log(error)
    }
}
function* searchCommunities(action) {
    try {
        const response = yield call(getRequest, BASE_API_URL + COMMUNITY.SEARCH_COMMUNITIES.replace("{searchVal}", action.searchVal)), responseData = response[1]
        if (responseData.success) {
            yield put(storeSearchedCommunities(responseData.communities))
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to search communities"))
        console.log(error)
    }
}
function* searchPosts(action) {
    try {
        const response = yield call(getRequest, BASE_API_URL + POSTS.SEARCH_POSTS.replace("{searchVal}", action.searchVal)), responseData = response[1]
        if (responseData.success) {
            yield put(storeSearchedPosts(responseData.posts))
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to search posts"))
        console.log(error)
    }
}

function* searchSaga() {
    yield takeLatest(SEARCH_USERS, searchUsers)
    yield takeLatest(SEARCH_COMMUNITIES, searchCommunities)
    yield takeLatest(SEARCH_POSTS, searchPosts)
}

export default searchSaga
