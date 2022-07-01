import { combineReducers } from 'redux';
import users from "./users";
import toast from "./toast";

const createRootReducer = combineReducers({ // Insert reducers
    users,
    toast
});

export default createRootReducer;