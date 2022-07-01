import {SHOW_TOAST, CLEAR_TOAST} from "../constants/toast";

export const showToast = (status, message) => ({
    type: SHOW_TOAST,
    status,
    message
})
export const clearToast = () => ({
    type: CLEAR_TOAST
})