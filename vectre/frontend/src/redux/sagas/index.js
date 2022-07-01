import { all } from 'redux-saga/effects';
import notificationSaga from './notification';
import usersSaga from "./users";

export default function* root() {
    yield all([ // Insert sagas
        usersSaga()
    ]);
}

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
<<<<<<< HEAD
}

export default function* root() {
  yield all([
      // insert sagas
      usersSaga(),
      notificationSaga()
  ]);
=======
>>>>>>> df4da443eeaea4c6ddea4dd1074f6894ac9189b9
}