import { call, put, takeLatest } from "redux-saga/effects"
import { getRequest, postRequest, putRequest } from "./index";
import {
    storeUsers,
    storeLoginNonce,
    storeLoggedInUser,
    storeUser,
    storeNFT,
    storeFunds,
    storeNotifications,
    storeUnreadStatus,
    getUser,
    getLoggedInUser,
} from "../actions/users";
import {
    GET_LOGIN_NONCE,
    LOGIN_USER,
    GET_USER,
    GET_USERS,
    GET_LOGGED_IN_USER,
    CREATE_USER,
    UPDATE_USER,
    GET_NOTIFICATIONS,
    FOLLOW_USER,
    UNFOLLOW_USER,
    GET_NFT,
    GET_FUNDS,
    UPDATE_DASHBOARD,
} from "../constants/users";
import {
    BASE_API_URL,
    USERS
} from "../constants/endpoints";
import { TOAST_STATUSES } from "../constants/global";
import { showLoading, showToast } from "../actions/global";

// Login
function* getLoginNonce(action) {
    try {
        const response = yield call(postRequest, BASE_API_URL + USERS.GET_LOGIN_NONCE, { walletAddress: action.walletAddress }), responseData = response[1]
        if (responseData.success)
            yield put(storeLoginNonce(responseData.nonce))
    } catch (error) {
        console.log(error)
    }
}
function* loginUser(action) {
    try {
        const response = yield call(postRequest, BASE_API_URL + USERS.LOGIN, { walletAddress: action.walletAddress, signedNonce: action.signedNonce }), responseData = response[1]
        if (responseData.success)
            yield put(showToast(TOAST_STATUSES.SUCCESS, responseData.message))
        yield put(action.redirectWindow("/home"))
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to get login"))
        console.log(error)
    }
}

function* getLoggedInUserSaga() {
    try {
        const response = yield call(getRequest, BASE_API_URL + USERS.GET_LOGGED_IN_USER), responseData = response[1]
        if (responseData.success)
            yield put(storeLoggedInUser(responseData.user))
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to get current logged in user"))
        console.log(error)
    }
}

function* getUserSaga(action) {
    try {
        yield put(showLoading(true))
        const response = yield call(getRequest, BASE_API_URL + USERS.GET_USERS + `/${action.walletAddress}`), responseData = response[1]
        if (responseData.success) {
            yield put(storeUser(responseData.user))
            yield put(showLoading(false))
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
            yield put(showLoading(false))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to get user"))
        console.log(error)
    }
}
function* getUsers() {
    try {
        const response = yield call(getRequest, BASE_API_URL + USERS.GET_USERS), responseData = response[1]
        if (responseData.success) {
            yield put(storeUsers(responseData.users))
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to get users"))
        console.log(error)
    }
}

function* getNFT(action) {
    try {
        const response = yield call(getRequest, BASE_API_URL + USERS.GET_NFT.replace("{walletAddress}", action.walletAddress)), responseData = response[1]
        if (responseData.success) {
            yield put(storeNFT(responseData.nft))
        }
        else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to get NFTs"))
        console.log(error)
    }
}

function* getFunds() {
    try {
        const response = yield call(getRequest, BASE_API_URL + USERS.GET_FUNDS), responseData = response[1]
        if (responseData.success) {
            yield put(storeFunds(responseData.funds))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to retrieve wallet funds."))
        console.log(error)
    }
}

function* createUser(action) {
    try {
        const response = yield call(postRequest, BASE_API_URL + USERS.CREATE_USER, action.user), responseData = response[1]
        if (responseData.success) {
            yield put(showToast(TOAST_STATUSES.SUCCESS, responseData.message))
            if (action.redirectWindow) yield put(action.redirectWindow("/home"))
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to create user"))
        console.log(error)
    }
}

function* updateUser(action) {
    try {
        const response = yield call(putRequest, BASE_API_URL + USERS.UPDATE_USER.replace("{walletAddress}", action.walletAddress), action.updatedUser), responseData = response[1]
        if (responseData.success) {
            yield put(getUser(action.walletAddress))
            yield put(getLoggedInUser())
            yield put(showToast(TOAST_STATUSES.SUCCESS, responseData.message))
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to update user"))
        console.log(error)
    }
}

function* updateDashboard(action) {
    try {
        const response = yield call(postRequest, BASE_API_URL + USERS.UPDATE_DASHBOARD.replace("{walletAddress}", action.walletAddress), { dashboard: action.dashboard }), responseData = response[1]
        if (responseData.success) {
            yield put(showToast(TOAST_STATUSES.SUCCESS, responseData.message))
            yield put(getUser(action.walletAddress))
            action.resetSelectedList()
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to update dashboard"))
        console.log(error)
    }
}

function* followUser(action) {
    try {
        const response = yield call(postRequest, BASE_API_URL + USERS.FOLLOW_USER.replace("{walletAddress}", action.walletAddressToFollow), {}), responseData = response[1]
        console.log(action);
        if (responseData.success) {
            if (action.callBack) {
                action.callBack()
                return;
            }
            yield put(getUser(action.profileWalletAddress))
            yield put(getLoggedInUser())
            if (action.toggleFollowList) action.toggleFollowList()
            yield put(showToast(TOAST_STATUSES.SUCCESS, responseData.message))
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to follow user"))
        console.log(error)
    }
}
function* unfollowUser(action) {
    try {
        const response = yield call(postRequest, BASE_API_URL + USERS.UNFOLLOW_USER.replace("{walletAddress}", action.walletAddressToUnfollow), {}), responseData = response[1]
        if (responseData.success) {
            if (action.callBack) {
                action.callBack()
                return;
            }
            yield put(getUser(action.profileWalletAddress))
            yield put(getLoggedInUser())
            if (action.toggleFollowList) action.toggleFollowList()
            yield put(showToast(TOAST_STATUSES.SUCCESS, responseData.message))
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to unfollow user"))
        console.log(error)
    }
}

function* getNotifications(action) {
    try {
        const response = yield call(getRequest, BASE_API_URL + USERS.GET_NOTIFICATIONS.replace("{walletAddress}", action.walletAddress)), responseData = response[1]
        if (responseData.success) {
            yield put(storeNotifications(responseData.notifications))
            yield put(storeUnreadStatus(responseData.unread))
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to get notifications"))
        console.log(error)
    }
}

function* usersSaga() {
    yield takeLatest(GET_LOGIN_NONCE, getLoginNonce)
    yield takeLatest(LOGIN_USER, loginUser)
    yield takeLatest(GET_LOGGED_IN_USER, getLoggedInUserSaga)
    yield takeLatest(GET_USER, getUserSaga)
    yield takeLatest(GET_NFT, getNFT)
    yield takeLatest(GET_FUNDS, getFunds)
    yield takeLatest(GET_USERS, getUsers)
    yield takeLatest(CREATE_USER, createUser)
    yield takeLatest(UPDATE_USER, updateUser)
    yield takeLatest(GET_NOTIFICATIONS, getNotifications)
    yield takeLatest(FOLLOW_USER, followUser)
    yield takeLatest(UNFOLLOW_USER, unfollowUser)
    yield takeLatest(GET_NFT, getNFT)
    yield takeLatest(UPDATE_DASHBOARD, updateDashboard)
}

export default usersSaga
