import { all } from 'redux-saga/effects';
import usersSaga from "./users";

const token = "my_example_auth_token"

export const getRequest = (url) => {
    return fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => Promise.all([response, response.json()]))
        .catch(error => { throw error })
}
export const postRequest = (url, data) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(response => Promise.all([response, response.json()]))
        .catch(error => { throw error })
}

export default function* root() {
  yield all([
      // insert sagas
      usersSaga()
  ]);
}