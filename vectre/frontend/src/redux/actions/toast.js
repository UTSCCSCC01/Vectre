import {STORE_TOAST, DELETE_TOAST} from "../constants/toast";

export const showToast = (status, message) => ({
    type: STORE_TOAST,
    status,
    message
})
export const deleteToast = () => ({
    type: DELETE_TOAST
})