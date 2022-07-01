import { call, put, takeLatest } from "redux-saga/effects"
import { getRequest, postRequest, putRequest } from "./index";
import {
    storeUsers,
    storeLoginNonce,
    storeLoggedInUser,
    storeUser,
} from "../actions/users";
import {
    GET_LOGIN_NONCE,
    LOGIN_USER,
    GET_USER,
    GET_USERS,
    GET_LOGGED_IN_USER,
    CREATE_USER,
    UPDATE_USER,
    FOLLOW_USER,
    UNFOLLOW_USER,
} from "../constants/users";
import {
    BASE_API_URL,
    USERS
} from "../constants/endpoints";
import { getCreate } from "../actions/create";
import {TOAST_STATUSES} from "../constants/toast";
import {showToast} from "../actions/toast";

// Login
function* getLoginNonce(action) {
    try {
        const response = yield call(postRequest, BASE_API_URL + USERS.GET_LOGIN_NONCE, { walletAddress: action.walletAddress }), responseData = response[1]
        if (responseData.success)
            yield put(storeLoginNonce(responseData.nonce))
    } catch (error) {
        console.log(error)
    }
}
function* loginUser(action) {
    try {
        const response = yield call(postRequest, BASE_API_URL + USERS.LOGIN, { walletAddress: action.walletAddress, signedNonce: action.signedNonce }), responseData = response[1]
        console.log(responseData)
        if (responseData.success)
            yield put(action.redirectWindow("/home"))
    } catch (error) {
        console.log(error)
    }
}

function* getLoggedInUser() {
    try {
        const response = yield call(getRequest, BASE_API_URL + USERS.GET_LOGGED_IN_USER), responseData = response[1]
        if (responseData.success)
            yield put(storeLoggedInUser(responseData.user))
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to get current logged in user"))
    }
}

function* getUser(action) {
    try {
        const response = yield call(getRequest, BASE_API_URL + USERS.GET_USERS + `/${action.walletAddress}`), responseData = response[1]
        if (responseData.success) {
            yield put(storeUser(responseData.user))
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to get user"))
    }
}
function* getUsers() {
    try {
        const response = yield call(getRequest, BASE_API_URL + USERS.GET_USERS), responseData = response[1]
        if (responseData.success) {
            yield put(storeUsers(responseData.users))
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to get users"))
    }
}

function* createUser(action) {
    try {
        const response = yield call(postRequest, BASE_API_URL + USERS.CREATE_USER, action.user), responseData = response[1]
        if (responseData.success) {
            yield put(getCreate(responseData))
            yield put(showToast(TOAST_STATUSES.SUCCESS, responseData.message))
            if (action.redirectWindow) yield put(action.redirectWindow("/home"))
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to create user"))
    }
}

function* updateUser(action) {
    try {
        const response = yield call(putRequest, BASE_API_URL + USERS.UPDATE_USER.replace("{walletAddress}", action.walletAddress), action.updatedUser), responseData = response[1]
        if (responseData.success) {
            yield put(showToast(TOAST_STATUSES.SUCCESS, responseData.message))
            if (action.redirectWindow) yield put(action.redirectWindow(`/user/${action.walletAddress}`))
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to update user"))
    }
}

function* followUser(action) {
    try {
        const response = yield call(postRequest, BASE_API_URL + USERS.FOLLOW_USER.replace("{walletAddress}", action.walletAddressToFollow), {}), responseData = response[1]
        if (responseData.success) {
            yield put(showToast(TOAST_STATUSES.SUCCESS, responseData.message))
            if (action.redirectWindow) yield put(action.redirectWindow(`/user/${action.walletAddressToFollow}`))
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to follow user"))
    }
}
function* unfollowUser(action) {
    try {
        const response = yield call(postRequest, BASE_API_URL + USERS.UNFOLLOW_USER.replace("{walletAddress}", action.walletAddressToUnfollow), {}), responseData = response[1]
        if (responseData.success) {
            yield put(showToast(TOAST_STATUSES.SUCCESS, responseData.message))
            if (action.redirectWindow) yield put(action.redirectWindow(`/user/${action.walletAddressToUnfollow}`))
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to unfollow user"))
    }
}

function* usersSaga() {
    yield takeLatest(GET_LOGIN_NONCE, getLoginNonce)
    yield takeLatest(LOGIN_USER, loginUser)
    yield takeLatest(GET_LOGGED_IN_USER, getLoggedInUser)
    yield takeLatest(GET_USER, getUser)
    yield takeLatest(GET_USERS, getUsers)
    yield takeLatest(CREATE_USER, createUser)
    yield takeLatest(UPDATE_USER, updateUser)
    yield takeLatest(FOLLOW_USER, followUser)
    yield takeLatest(UNFOLLOW_USER, unfollowUser)
}

export default usersSaga
