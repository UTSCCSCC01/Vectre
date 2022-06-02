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

const getRequest = (url) => {
    return fetch(url, {
        method: "GET"
    })
        .then(response => response.json())
        .catch(error => { throw error })
}

const postRequest = (url, data) => {
    return fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(error => { throw error })
}

// this function gets one user and sees if the user exists in db or not
function* getUser(action) {
    try {
        const response = yield call(postRequest, BASE_API_URL + USERS.GET_USER, action.user)
        yield put(getLogin(response))
        if (response.success) {
            // if response was sucessful, store user_data into storeUsers
            yield put(storeUsers([response.user_data]))
        }
        else {
            // if response was unsucessful, go to setup page
            console.log(response.success);
        }
    } catch (error) {
        console.log(`ERROR: ${error.message}`)
    }
}

function* getUsers() {
    try {
        const response = yield call(getRequest, BASE_API_URL + USERS.GET_USERS)
        yield put(storeUsers(response))
    } catch (error) {
        console.log(`ERROR: ${error.message}`)
    }
}

function* createUser(action) {
    try {
        const response = yield call(postRequest, BASE_API_URL + USERS.CREATE_USER, action.user)
        yield put(storeUsers(response))
        console.log(response);
    } catch (error) {
        console.log(`ERROR: ${error.message}`)
    }
}

function* usersSaga() {
    yield takeLatest(GET_USER, getUser)
    yield takeLatest(GET_USERS, getUsers)
    yield takeLatest(CREATE_USER, createUser)
}

export default usersSaga
