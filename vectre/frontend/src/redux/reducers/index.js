import { combineReducers } from 'redux';
import users from "./users";
import login from "./login";

const createRootReducer = combineReducers({
    // insert reducers
    users,
    login
});

export default createRootReducer;