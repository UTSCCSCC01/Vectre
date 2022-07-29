import { call, put, takeLatest } from "redux-saga/effects"
import { getRequest, postRequest, putRequest } from "./index";
import {
    BASE_API_URL,
    USERS,
    COMMUNITY
} from "../constants/endpoints";
import { showLoading, showToast } from "../actions/global";
import { TOAST_STATUSES } from "../constants/global";
import {
    CREATE_COMMUNITY,
    GET_COMMUNITY,
    GET_TRENDING_COMMUNITIES,
    UPDATE_COMMUNITY,
    GET_ROLES_LOGGED_IN_USER,
    JOIN_COMMUNITY,
    LEAVE_COMMUNITY,
    SEARCH_COMMUNITIES,
} from "../constants/communities";
import {
    getCommunity,
    getRolesOfLoggedInUser,
    storeCommunity,
    storeRolesOfLoggedInUser,
    storeSearchedCommunities,
    storeTrendingCommunities
} from "../actions/communities";

function* createCommunitySaga(action) {
    try {
        const response = yield call(postRequest, BASE_API_URL + COMMUNITY.CREATE_COMMUNITY, action.community), responseData = response[1]
        if (responseData.success) {
            yield put(action.redirectWindow(`/c/${responseData.communityID}`))
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to create community"))
        console.log(error)
    }
}

function* getCommunitySaga(action) {
    try {
        yield put(showLoading(true))
        const response = yield call(getRequest, BASE_API_URL + COMMUNITY.GET_COMMUNITY.replace("{communityID}", action.communityID)), responseData = response[1]
        if (responseData.success) {
            yield put(storeCommunity(responseData.community))
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
        yield put(showLoading(false))
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to get community"))
        console.log(error)
    }
}

function* getTrendingCommunities() {
    try {
        yield put(showLoading(true))
        const response = yield call(getRequest, BASE_API_URL + COMMUNITY.GET_TRENDING_COMMUNITIES), responseData = response[1]
        if (responseData.success) {
            yield put(storeTrendingCommunities(responseData.communities))
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
        yield put(showLoading(false))
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to get trending communities"))
        console.log(error)
    }
}

function* searchCommunities(action) {
    try {
        const response = yield call(getRequest, BASE_API_URL + COMMUNITY.SEARCH_COMMUNITIES.replace("{searchVal}", action.searchVal)), responseData = response[1]
        if (responseData.success) {
            yield put(storeSearchedCommunities(responseData.communities))
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to get communities"))
        console.log(error)
    }
}

function* updateCommunitySaga(action) {
    try {
        const response = yield call(putRequest, BASE_API_URL + COMMUNITY.UPDATE_COMMUNITY.replace("{communityID}", action.communityID), action.community), responseData = response[1]
        if (responseData.success) {
            if (responseData.communityID !== action.communityID) {
                yield put(action.redirectWindow(`/c/${responseData.communityID}`))
                yield put(showToast(TOAST_STATUSES.SUCCESS, responseData.message))
            }
            else {
                yield put(getCommunity(action.communityID));
                yield put(showToast(TOAST_STATUSES.SUCCESS, responseData.message))
            }
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to update community"))
        console.log(error)
    }
}

function* getRolesOfLoggedInUserSaga(action) {
    try {
        const loggedInUserResponse = yield call(getRequest, BASE_API_URL + USERS.GET_LOGGED_IN_USER), loggedInUserResponseData = loggedInUserResponse[1]
        if (loggedInUserResponseData?.user?.walletAddress) {
            const response = yield call(getRequest, BASE_API_URL + COMMUNITY.GET_ROLES_LOGGED_IN_USER.replace("{communityID}", action.communityID).replace("{walletAddress}", loggedInUserResponseData.user.walletAddress)), responseData = response[1]
            if (responseData.success) {
                yield put(storeRolesOfLoggedInUser(responseData.roles));
            } else {
                yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
            }
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to get roles of current user"))
        console.log(error)
    }
}

function* joinCommunity(action) {
    try {
        const response = yield call(postRequest, BASE_API_URL + COMMUNITY.JOIN_COMMUNITY.replace("{communityID}", action.communityID)), responseData = response[1]
        if (responseData.success) {
            yield put(getCommunity(action.communityID))
            yield put(getRolesOfLoggedInUser(action.communityID))
            yield put(showToast(TOAST_STATUSES.SUCCESS, responseData.message))
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to join community"))
        console.log(error)
    }
}

function* leaveCommunity(action) {
    try {
        const response = yield call(postRequest, BASE_API_URL + COMMUNITY.LEAVE_COMMUNITY.replace("{communityID}", action.communityID)), responseData = response[1]
        if (responseData.success) {
            yield put(getCommunity(action.communityID))
            yield put(getRolesOfLoggedInUser(action.communityID))
            yield put(showToast(TOAST_STATUSES.SUCCESS, responseData.message))
        } else {
            yield put(showToast(TOAST_STATUSES.ERROR, responseData.message))
        }
    } catch (error) {
        yield put(showToast(TOAST_STATUSES.ERROR, "Failed to leave community"))
        console.log(error)
    }
}

function* communitySaga() {
    yield takeLatest(CREATE_COMMUNITY, createCommunitySaga)
    yield takeLatest(GET_COMMUNITY, getCommunitySaga)
    yield takeLatest(GET_TRENDING_COMMUNITIES, getTrendingCommunities)
    yield takeLatest(SEARCH_COMMUNITIES, searchCommunities)
    yield takeLatest(UPDATE_COMMUNITY, updateCommunitySaga)
    yield takeLatest(GET_ROLES_LOGGED_IN_USER, getRolesOfLoggedInUserSaga)
    yield takeLatest(JOIN_COMMUNITY, joinCommunity)
    yield takeLatest(LEAVE_COMMUNITY, leaveCommunity)
}

export default communitySaga
