import { combineReducers } from 'redux';
import users from "./users";
import posts from "./posts";
import toast from "./toast";
import loading from "./loading";
import community from "./community";
import feed from "./feed";

const createRootReducer = combineReducers({ // Insert reducers
    users,
    posts,
    toast,
    loading,
    community,
    feed
});

export default createRootReducer;