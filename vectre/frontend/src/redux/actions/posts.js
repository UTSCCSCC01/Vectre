import {
    GET_POST,
    STORE_POST,
    GET_COMMENTS,
    STORE_COMMENTS,
    POST_COMMENT,
    POST_LIKE,
    POST_UNLIKE,
    DO_LIKE,
    DO_UNLIKE
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

export const postComment = (postID, comment, reloadForm) => ({
    type: POST_COMMENT,
    postID,
    comment,
    reloadForm
})

export const postLike = (postID, walletAddress, isComment) => ({
    type: POST_LIKE,
    postID,
    walletAddress,
    isComment,
})

export const postUnlike = (postID, walletAddress, isComment) => ({
    type: POST_UNLIKE,
    postID,
    walletAddress,
    isComment,
})

export const doLike = (postID, walletAddress, isComment) => ({
    type: DO_LIKE,
    postID,
    walletAddress,
    isComment
})

export const doUnlike = (postID, walletAddress, isComment) => ({
    type: DO_UNLIKE,
    postID,
    walletAddress,
    isComment
})