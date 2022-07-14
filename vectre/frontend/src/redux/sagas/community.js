import { call, put, takeLatest } from "redux-saga/effects"
import { getRequest, postRequest, putRequest } from "./index";
import {
    BASE_API_URL,
    COMMUNITY
} from "../constants/endpoints";
import { showToast } from "../actions/toast";
import { TOAST_STATUSES } from "../constants/toast";
import { showLoading } from "../../redux/actions/loading";
import { GET_COMMUNITY } from "../constants/community";
import { storeCommunity } from "../actions/community";

function* getCommunitySaga(action) {
    try {
        yield put(showLoading(true))
        const response = yield call(getRequest, BASE_API_URL + COMMUNITY.GET_COMMUNITY.replace("{communityID}", action.communityID)), responseData = response[1]
        if (responseData.success) {
            yield put(storeCommunity(responseData.community))
            yield put(showLoading(false))
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
            yield put(showLoading(false))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to get community"))
        console.log(error)
    }
}

function* communitySaga() {
    yield takeLatest(GET_COMMUNITY, getCommunitySaga)
}

export default communitySaga
