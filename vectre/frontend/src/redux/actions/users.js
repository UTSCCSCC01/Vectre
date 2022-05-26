import {
    GET_USERS,
    STORE_USERS,
    CREATE_USER,
} from "../constants/users";

export const getUsers = () => ({
    type: GET_USERS
})

export const storeUsers = (users) => ({
    type: STORE_USERS,
    users
})

export const createUser = (user) => ({
    type: CREATE_USER,
    user
})