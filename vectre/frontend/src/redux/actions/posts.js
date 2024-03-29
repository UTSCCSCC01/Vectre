import {
    CREATE_POST,
    GET_POST,
    STORE_POST,
    CREATE_REPOST,
    GET_COMMENTS,
    STORE_COMMENTS,
    CREATE_COMMENT,
    POST_LIKE,
    POST_UNLIKE,
    DO_LIKE,
    DO_UNLIKE,
    GET_PROFILE_POSTS,
    STORE_PROFILE_POSTS,
} from "../constants/posts";

// Posts
export const createPost = (postData, redirectWindow) => ({
    type: CREATE_POST,
    postData,
    redirectWindow
})
export const getPost = (postID) => ({
    type: GET_POST,
    postID
})
export const storePost = (post) => ({
    type: STORE_POST,
    post
})

export const createRepost = (repostData, redirectWindow) => ({
    type: CREATE_REPOST,
    repostData,
    redirectWindow
})
export const getProfilePosts = (walletAddress) => ({
    type: GET_PROFILE_POSTS,
    walletAddress
})
export const storeProfilePost = (posts) => ({
    type: STORE_PROFILE_POSTS,
    posts
})

// Post interactions:
// Comments
export const createComment = (postID, comment, reloadForm) => ({
    type: CREATE_COMMENT,
    postID,
    comment,
    reloadForm
})
export const getComments = (postID) => ({
    type: GET_COMMENTS,
    postID
})
export const storeComments = (comments) => ({
    type: STORE_COMMENTS,
    comments
})

// Like
export const postLike = (postID, isComment, fromFeed, fromSearch) => ({
    type: POST_LIKE,
    postID,
    isComment,
    fromFeed,
    fromSearch
})
export const postUnlike = (postID, isComment, fromFeed, fromSearch) => ({
    type: POST_UNLIKE,
    postID,
    isComment,
    fromFeed,
    fromSearch
})

// Internal actions for updating like counter
export const doLike = (postID, isComment, fromFeed) => ({
    type: DO_LIKE,
    postID,
    isComment,
    fromFeed
})
export const doUnlike = (postID, isComment, fromFeed) => ({
    type: DO_UNLIKE,
    postID,
    isComment,
    fromFeed
})