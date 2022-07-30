import { call, put, takeLatest } from "redux-saga/effects"
import { getRequest, postRequest, putRequest } from "./index";
import {
    BASE_API_URL,
    USERS,
    COMMUNITY,
} from "../constants/endpoints";
import { showLoading, showToast } from "../actions/global";
import { TOAST_STATUSES } from "../constants/global";
import {
    GET_TRENDING_USERS,
    GET_TRENDING_COMMUNITIES,
} from "../constants/trending";
import {
    storeTrendingUsers,
    storeTrendingCommunities,
} from "../actions/trending";

function* getTrendingUsers() {
    try {
        yield put(showLoading(true))
        const response = yield call(getRequest, BASE_API_URL + USERS.GET_TRENDING_USERS), responseData = response[1]
        if (responseData.success) {
            yield put(storeTrendingUsers(responseData.users))
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to get trending users"))
        console.log(error)
    }
    yield put(showLoading(false))
}
function* getTrendingCommunities() {
    try {
        yield put(showLoading(true))
        const response = yield call(getRequest, BASE_API_URL + COMMUNITY.GET_TRENDING_COMMUNITIES), responseData = response[1]
        if (responseData.success) {
            yield put(storeTrendingCommunities(responseData.communities))
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to get trending communities"))
        console.log(error)
    }
    yield put(showLoading(false))
}

function* trendingSaga() {
    yield takeLatest(GET_TRENDING_USERS, getTrendingUsers)
    yield takeLatest(GET_TRENDING_COMMUNITIES, getTrendingCommunities)
}

export default trendingSaga
