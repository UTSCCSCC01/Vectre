import { call, put, takeLatest } from "redux-saga/effects"
import { postRequest } from "./index";
import { READ_NOTIFICATION } from "../constants/notification";
import { 
    BASE_API_URL,
    NOTIF        
} from "../constants/endpoints";
import {showToast} from "../actions/toast";
import {TOAST_STATUSES} from "../constants/toast";

function* readNotification(action) {
    try {
        const response = yield call(postRequest, BASE_API_URL + NOTIF.READ_NOTIFICATION.replace("{notificationID}", action.notificationID)), responseData = response[1]
        if (responseData.success) {
            // console.log(responseData.message)
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to send notification read receipt"))
        console.log(error)
    }
}

function* notificationSaga() {
    yield takeLatest(READ_NOTIFICATION, readNotification)
}

export default notificationSaga