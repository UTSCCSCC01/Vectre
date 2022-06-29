import { call, put, takeLatest } from "redux-saga/effects"
import { getRequest, postRequest, putRequest } from "./index";
import {
    storeComments
} from "../actions/posts";
import {
    GET_COMMENTS
} from "../constants/posts";
import {
    BASE_API_URL,
    POSTS
} from "../constants/endpoints";

function* getComments(action) {
    try {
        const response = yield call(getRequest, BASE_API_URL + POSTS.GET_COMMENTS.replace("{postID}", action.postID)), responseData = response[1]
        if (responseData.success) {
            console.log(responseData.comments);
            yield put(storeComments(responseData.comments))
        } else { // TODO: Show error message
        }
    } catch (error) {
        console.log(error)
    }
}

function* postsSaga() {
    yield takeLatest(GET_COMMENTS, getComments)
}

export default postsSaga
