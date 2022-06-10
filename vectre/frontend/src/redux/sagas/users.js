import { call, put, takeLatest } from "redux-saga/effects"
import { getRequest, postRequest } from "./index";
import {
    storeUsers,
    storeLoginNonce,
} from "../actions/users";
import {
    GET_LOGIN_NONCE,
    LOGIN_USER,
    GET_USERS,
    CREATE_USER,
} from "../constants/users";
import {
    BASE_API_URL,
    USERS
} from "../constants/endpoints";
import { getCreate } from "../actions/create";

// Login
function* getLoginNonce(action) {
    try {
        const response = yield call(postRequest, BASE_API_URL + USERS.GET_LOGIN_NONCE, {wallet_address: action.wallet_address}), responseData = response[1]
        if (responseData.success)
            yield put(storeLoginNonce(responseData.nonce))
    } catch (error) {
        console.log(error)
    }
}
function* loginUser(action) {
    try {
        const response = yield call(postRequest, BASE_API_URL + USERS.LOGIN, {wallet_address: action.wallet_address, signed_nonce: action.signedNonce}), responseData = response[1]
        console.log(responseData)
        if (responseData.success)
            yield put(action.redirectWindow("/feed"))
    } catch (error) {
        console.log(error)
    }
}

function* getUsers() {
    try {
        const response = yield call(getRequest, BASE_API_URL + USERS.GET_USERS), responseData = response[1]
        if (responseData.success) {
            yield put(storeUsers(responseData.users))
        } else { // TODO: Show error message
        }
    } catch (error) {
        console.log(error)
    }
}

function* createUser(action) {
    try {
        const response = yield call(postRequest, BASE_API_URL + USERS.CREATE_USER, action.user), responseData = response[1]
        if (responseData.success) { // TODO: Show toast success message
            yield put(getCreate(responseData))
            if (action.redirectWindow) yield put(action.redirectWindow("/feed"))
        } else { // TODO: Show toast error message
        }
    } catch (error) {
        console.log(error)
    }
}

function* usersSaga() {
    yield takeLatest(GET_LOGIN_NONCE, getLoginNonce)
    yield takeLatest(LOGIN_USER, loginUser)
    yield takeLatest(GET_USERS, getUsers)
    yield takeLatest(CREATE_USER, createUser)
}

export default usersSaga
