import { call, put, takeLatest } from "redux-saga/effects"
import { getRequest, postRequest, putRequest } from "./index";
import {
    storePost,
    storeComments
} from "../actions/posts";
import {
    GET_POST,
    GET_COMMENTS,
    POST_COMMENT,
    POST_LIKE,
    POST_UNLIKE
} from "../constants/posts";
import {
    BASE_API_URL,
    POSTS
} from "../constants/endpoints";

function* getPost(action) {
    try {
        const response = yield call(getRequest, BASE_API_URL + POSTS.GET_POST.replace("{postID}", action.postID)), responseData = response[1]
        if (responseData.success) {
            yield put(storePost(responseData.post))
        } else { // TODO: Show error message
        }
    } catch (error) {
        console.log(error)
    }
}

function* getComments(action) {
    try {
        const response = yield call(getRequest, BASE_API_URL + POSTS.GET_COMMENTS.replace("{postID}", action.postID)), responseData = response[1]
        if (responseData.success) {
            yield put(storeComments(responseData.comments))
        } else { // TODO: Show error message
        }
    } catch (error) {
        console.log(error)
    }
}

function* postComment(action) {
    try {
        const response = yield call(postRequest, BASE_API_URL + POSTS.POST_COMMENT.replace("{postID}", action.postID), action.comment), responseData = response[1]
        if (responseData.success) {
            yield getPost({ postID: action.postID });
            yield getComments({ postID: action.postID });
            action.reloadForm();
        } else { // TODO: Show toast error message
        }
    } catch (error) {
        console.log(error)
    }
}

function* postLike(action) {
    try {
        const response = yield call(postRequest, BASE_API_URL + POSTS.POST_LIKE.replace("{postID}", action.postID), action.walletAddress), responseData = response[1]
        console.log(response)
        if (responseData.success) {
            action.reloadComponent();
        } else { // TODO: Show toast error message
        }
    } catch (error) {
        console.log(error)
    }
}

function* postUnlike(action) {
    try {
        const response = yield call(postRequest, BASE_API_URL + POSTS.POST_UNLIKE.replace("{postID}", action.postID), action.walletAddress), responseData = response[1]
        console.log(response)
        if (responseData.success) {
            action.reloadComponent();
        } else { // TODO: Show toast error message
        }
    } catch (error) {
        console.log(error)
    }
}

function* postsSaga() {
    yield takeLatest(GET_POST, getPost)
    yield takeLatest(GET_COMMENTS, getComments)
    yield takeLatest(POST_COMMENT, postComment)
    yield takeLatest(POST_LIKE, postLike)
    yield takeLatest(POST_UNLIKE, postUnlike)
}

export default postsSaga
