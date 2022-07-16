import { combineReducers } from 'redux';
import users from "./users";
import posts from "./posts";
import feed from "./feed";
import communities from "./communities";
import global from "./global";

const createRootReducer = combineReducers({ // Insert reducers
    users,
    posts,
    feed,
    communities,
    global
});

export default createRootReducer;