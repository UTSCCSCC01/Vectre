import { combineReducers } from 'redux';
import users from "./users";
import posts from "./posts";
import communities from "./communities";
import global from "./global";

const createRootReducer = combineReducers({ // Insert reducers
    users,
    posts,
    communities,
    global,
});

export default createRootReducer;