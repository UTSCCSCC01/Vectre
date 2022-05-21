import { all } from 'redux-saga/effects';
import usersSaga from "./users";

export default function* root() {
  yield all([
      // insert sagas
      usersSaga()
  ]);
}