import { call, put, takeLatest } from "redux-saga/effects"
import { getRequest, postRequest, putRequest } from "./index";
import {
    storePost,
    storeComments,
    doLike,
    doUnlike,
    getPost,
    getComments,
    storeFeed,
    storeProfilePost,
} from "../actions/posts";
import {
    CREATE_POST,
    GET_POST,
    GET_COMMENTS,
    CREATE_COMMENT,
    POST_LIKE,
    POST_UNLIKE,
    CREATE_REPOST,
    GET_PROFILE_POSTS,
    GET_FEED,
} from "../constants/posts";
import {
    BASE_API_URL,
    POSTS
} from "../constants/endpoints";
import { showToast } from "../actions/toast";
import { TOAST_STATUSES } from "../constants/toast";
import { doneLoading, showLoading } from "../../redux/actions/loading";

function* createPost(action) {
    try {
        const response = yield call(postRequest, BASE_API_URL + POSTS.CREATE_POST, action.postData), responseData = response[1]
        if (responseData.success) {
            yield put(showToast(TOAST_STATUSES.SUCCESS, responseData.message))
            yield put(action.redirectWindow("/post/" + responseData.newPostID))
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to create post"))
        console.log(error)
    }
}

function* createRepost(action) {
    try {
        const response = yield call(postRequest, BASE_API_URL + POSTS.CREATE_REPOST, action.repostData), responseData = response[1]
        if (responseData.success) {
            yield put(showToast(TOAST_STATUSES.SUCCESS, responseData.message))
            yield put(action.redirectWindow("/post/" + responseData.newPostID))
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to create repost"))
        console.log(error)
    }
}

function* getPostSaga(action) {
    try {
        yield put(showLoading(true))
        const response = yield call(getRequest, BASE_API_URL + POSTS.GET_POST.replace("{postID}", action.postID)), responseData = response[1]
        if (responseData.success) {
            yield put(storePost(responseData.post))
            yield put(showLoading(false))
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
            yield put(showLoading(false))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to get post"))
        console.log(error)
    }
}

function* getCommentsSaga(action) {
    try {
        const response = yield call(getRequest, BASE_API_URL + POSTS.GET_COMMENTS.replace("{postID}", action.postID)), responseData = response[1]
        if (responseData.success) {
            yield put(storeComments(responseData.comments))
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to get comments"))
        console.log(error)
    }
}

function* getFeed(action) {
    try {
        const defaultSize = 10
        const response = yield call(postRequest, BASE_API_URL + POSTS.GET_FEED, { start: action.feedIndex, size: defaultSize }), responseData = response[1]
        if (responseData.success) {
            yield put(storeFeed(responseData.posts, defaultSize))
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to get feed"))
        console.log(error)
    }
}

function* createComment(action) {
    try {
        const response = yield call(postRequest, BASE_API_URL + POSTS.CREATE_COMMENT.replace("{postID}", action.postID), action.comment), responseData = response[1]
        if (responseData.success) {
            yield put(getPost(action.postID))
            yield put(getComments(action.postID))
            action.reloadForm();
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to comment"))
        console.log(error)
    }
}

function* postLike(action) {
    try {
        const response = yield call(postRequest, BASE_API_URL + POSTS.POST_LIKE.replace("{postID}", action.postID)), responseData = response[1]
        if (responseData.success) {
            yield put(doLike(action.postID, action.walletAddress, action.isComment, action.fromFeed));
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to like"))
        console.log(error)
    }
}

function* postUnlike(action) {
    try {
        const response = yield call(postRequest, BASE_API_URL + POSTS.POST_UNLIKE.replace("{postID}", action.postID)), responseData = response[1]
        if (responseData.success) {
            yield put(doUnlike(action.postID, action.walletAddress, action.isComment, action.fromFeed));
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to unlike"))
        console.log(error)
    }
}

function* getProfilePosts(action) {
    try {
        const response = yield call(getRequest, BASE_API_URL + POSTS.GET_PROFILE_POSTS.replace("{walletAddress}", action.walletAddress)), responseData = response[1]
        if (responseData.success) {
            yield put(storeProfilePost(responseData.posts))
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to get posts for this profile"))
        console.log(error)
    }
}

function* postsSaga() {
    yield takeLatest(CREATE_POST, createPost)
    yield takeLatest(CREATE_REPOST, createRepost)
    yield takeLatest(GET_POST, getPostSaga)
    yield takeLatest(GET_COMMENTS, getCommentsSaga)
    yield takeLatest(GET_FEED, getFeed)
    yield takeLatest(CREATE_COMMENT, createComment)
    yield takeLatest(POST_LIKE, postLike)
    yield takeLatest(POST_UNLIKE, postUnlike)
    yield takeLatest(GET_PROFILE_POSTS, getProfilePosts)
}

export default postsSaga
