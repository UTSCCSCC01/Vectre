import { combineReducers } from 'redux';
import users from "./users";
import login from "./login";
import create from "./create";
import posts from "./posts";

const createRootReducer = combineReducers({
    // insert reducers
    users,
    login,
    create,
    posts
});

export default createRootReducer;