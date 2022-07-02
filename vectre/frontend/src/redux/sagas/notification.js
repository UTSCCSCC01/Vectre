import { call, put, takeLatest } from "redux-saga/effects"
import { postRequest } from "./index";
import { READ_NOTIFICATION } from "../constants/notification";
import { 
    BASE_API_URL,
    NOTIF        
} from "../constants/endpoints";

function* readNotification(action) {
    try {
        const response = yield call(postRequest, BASE_API_URL + NOTIF.READ_NOTIFICATION.replace("{notificationID}", action.notificationID)), responseData = response[1]
        if (responseData.success) { // TODO: Show toast success message
            console.log(responseData.message)
        } else {
        }
    } catch (error) {
        console.log(error)
    }
}

function* notificationSaga() {
    yield takeLatest(READ_NOTIFICATION, readNotification)
}

export default notificationSaga