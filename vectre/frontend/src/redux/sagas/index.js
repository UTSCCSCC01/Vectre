import { all } from 'redux-saga/effects';
import usersSaga from "./users";
import postsSaga from "./posts";

const headers = {
    'Content-Type': 'application/json',
    'Accepts-Type': 'application/json',
}

export const getRequest = (url) => {
    return fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: headers
    })
        .then(response => Promise.all([response, response.json()]))
        .catch(error => { throw error })
}
export const postRequest = (url, data) => {
    return fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: headers,
        body: JSON.stringify(data)
    })
        .then(response => Promise.all([response, response.json()]))
        .catch(error => { throw error })
}
export const putRequest = (url, data) => {
    return fetch(url, {
        method: 'PUT',
        credentials: 'include',
        headers: headers,
        body: JSON.stringify(data)
    })
        .then(response => Promise.all([response, response.json()]))
        .catch(error => { throw error })
}

export default function* root() {
    yield all([
        // insert sagas
        usersSaga(),
        postsSaga()
    ]);
}
