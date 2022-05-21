import { combineReducers } from 'redux';
import users from "./users";

const createRootReducer = combineReducers({
    // insert reducers
    users
});

export default createRootReducer;