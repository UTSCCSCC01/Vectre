import {
    GET_USERS,
    STORE_USERS,
} from "../constants/users";

export const getUsers = () => ({
    type: GET_USERS
})

export const storeUsers = (users) => ({
    type: STORE_USERS,
    users
})