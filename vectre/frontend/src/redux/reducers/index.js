import { combineReducers } from 'redux';
import users from "./users";
import posts from "./posts";
import toast from "./toast";
import filteringSortingFeed from "./filteringSortingFeed";

const createRootReducer = combineReducers({ // Insert reducers
    users,
    posts,
    toast, 
    filteringSortingFeed
});

export default createRootReducer;