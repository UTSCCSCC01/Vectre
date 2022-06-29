import {
    GET_COMMENTS,
    STORE_COMMENTS,
} from "../constants/posts";

export const getComments = (postID) => ({
    type: GET_COMMENTS,
    postID
})

export const storeComments = (comments) => ({
    type: STORE_COMMENTS,
    comments
})