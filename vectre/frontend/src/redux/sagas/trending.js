import { call, put, takeLatest } from "redux-saga/effects"
import { getRequest, postRequest, putRequest } from "./index";
import {
    BASE_API_URL,
    COMMUNITY,
} from "../constants/endpoints";
import { showLoading, showToast } from "../actions/global";
import { TOAST_STATUSES } from "../constants/global";
import {GET_TRENDING_COMMUNITIES} from "../constants/trending";
import {storeTrendingCommunities} from "../actions/trending";

function* getTrendingCommunities() {
    try {
        yield put(showLoading(true))
        const response = yield call(getRequest, BASE_API_URL + COMMUNITY.GET_TRENDING_COMMUNITIES), responseData = response[1]
        if (responseData.success) {
            yield put(storeTrendingCommunities(responseData.communities))
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
        yield put(showLoading(false))
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to get trending communities"))
        console.log(error)
    }
}


function* trendingSaga() {
    yield takeLatest(GET_TRENDING_COMMUNITIES, getTrendingCommunities)
}

export default trendingSaga
