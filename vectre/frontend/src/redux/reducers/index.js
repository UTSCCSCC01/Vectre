import { combineReducers } from 'redux';
import users from "./users";
import posts from "./posts";
import global from "./global";
import community from "./community";

const createRootReducer = combineReducers({ // Insert reducers
    users,
    posts,
    global,
    community
});

export default createRootReducer;