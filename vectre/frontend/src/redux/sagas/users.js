import { call, put, takeLatest } from "redux-saga/effects"
import {
    storeUsers
} from "../actions/users";
import {
    GET_USERS
} from "../constants/users";
import {
    BASE_API_URL,
    USERS
} from "../constants/endpoints";

const getRequest = (url) => {
    return fetch(url, {
        method: "GET"
    })
        .then(response => response.json())
        .catch(error => {throw error})
}

// const postRequest = (url, data) => { // TODO: POST request
//     return fetch(url, {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//         .then(response => response.json())
//         .catch(error => {throw error})
// }

function* getUsers() {
    try {
        // const response = yield call(getRequest, BASE_API_URL + USERS.GET_USERS)
        const response = yield call(getRequest, "https://jsonplaceholder.typicode.com/users")
        yield put(storeUsers(response))
    } catch (error) {
        console.log(`ERROR: ${error.message}`)
    }
}

function* usersSaga () {
    yield takeLatest(GET_USERS, getUsers)
}

export default usersSaga
