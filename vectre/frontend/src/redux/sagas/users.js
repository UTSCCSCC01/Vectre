import { call, put, takeLatest } from "redux-saga/effects"
import {
    storeUsers
} from "../actions/users";
import {
    CREATE_USER,
    GET_USERS,
    GET_USER
} from "../constants/users";
import {
    BASE_API_URL,
    USERS
} from "../constants/endpoints";
import { getLogin } from "../actions/login";
import { getCreate } from "../actions/create";
import { getRequest, postRequest } from "./index";

function* getUser(action) { // Checks if a user exists in DB & returns associated user
    try {
        const response = yield call(getRequest, BASE_API_URL + USERS.GET_USERS + `/${action.user.wallet_address}`), responseData = response[1]
        yield put(getLogin(responseData))
        if (responseData.success) // Store user
            yield put(storeUsers([responseData.user]))
        else // TODO: Redirect to setup page
            console.log(responseData.success);
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
        if (responseData.success) { // TODO: Show success message
            yield put(getCreate(responseData))
        } else { // TODO: Show error message
        }
    } catch (error) {
        console.log(error)
    }
}

function* usersSaga() {
    yield takeLatest(GET_USER, getUser)
    yield takeLatest(GET_USERS, getUsers)
    yield takeLatest(CREATE_USER, createUser)
}

export default usersSaga
