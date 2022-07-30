import { combineReducers } from 'redux';
import users from "./users";
import communities from "./communities";
import posts from "./posts";
import feed from "./feed";
import search from "./search";
import trending from "./trending";
import global from "./global";

const createRootReducer = combineReducers({ // Insert reducers
    users,
    communities,
    posts,
    feed,
    search,
    trending,
    global
});

export default createRootReducer;