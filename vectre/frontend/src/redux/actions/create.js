import {
    GET_CREATE
} from "../constants/create.js";

export const getCreate = (response) => ({
    type: GET_CREATE,
    response
})