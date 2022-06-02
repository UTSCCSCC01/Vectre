import {
    GET_LOGIN
} from "../constants/login";

export const getLogin = (response) => ({
    type: GET_LOGIN,
    response
})