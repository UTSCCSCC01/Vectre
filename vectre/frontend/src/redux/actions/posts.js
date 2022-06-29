import {
    GET_POST,
    STORE_POST,
    GET_COMMENTS,
    STORE_COMMENTS,
} from "../constants/posts";

export const getPost = (postID) => ({
    type: GET_POST,
    postID
})

export const storePost = (post) => ({
    type: STORE_POST,
    post
})

export const getComments = (postID) => ({
    type: GET_COMMENTS,
    postID
})

export const storeComments = (comments) => ({
    type: STORE_COMMENTS,
    comments
})