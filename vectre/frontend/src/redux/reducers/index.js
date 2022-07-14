import { combineReducers } from 'redux';
import users from "./users";
import posts from "./posts";
import toast from "./toast";

const createRootReducer = combineReducers({ // Insert reducers
    users,
    posts,
    toast, 
});

export default createRootReducer;