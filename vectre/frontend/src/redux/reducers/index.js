import { combineReducers } from 'redux';
import users from "./users";
import login from "./login";
import create from "./create";

const createRootReducer = combineReducers({
    // insert reducers
    users,
    login,
    create
});

export default createRootReducer;