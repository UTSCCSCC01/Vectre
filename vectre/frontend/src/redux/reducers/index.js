import { combineReducers } from 'redux';
import users from "./users";
import posts from "./posts";
import toast from "./toast";
import loading from "./loading";

const createRootReducer = combineReducers({ // Insert reducers
    users,
    posts,
    toast,
    loading
});

export default createRootReducer;