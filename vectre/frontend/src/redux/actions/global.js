import {
    SHOW_TOAST,
    CLEAR_TOAST,
    SHOW_LOADING
} from "../constants/global";

export const showToast = (status, message) => ({
    type: SHOW_TOAST,
    status,
    message
})
export const clearToast = () => ({
    type: CLEAR_TOAST
})

export const showLoading = (bool) => ({
    type: SHOW_LOADING,
    bool
})