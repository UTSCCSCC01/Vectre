import { combineReducers } from 'redux';
import users from "./users";
import login from "./login";
import create from "./create";
import toast from "./toast";

const createRootReducer = combineReducers({
    // insert reducers
    users,
    login,
    create,
    toast
});

export default createRootReducer;