import {
    SHOW_TOAST,
    CLEAR_TOAST,
    SHOW_LOADING,
} from "../constants/global";

const initialState = {
    toast: {
        status: "",
        message: ""
    },
    loading: false
}

const global = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_TOAST:
            return {
                ...state,
                toast: {
                    status: action.status,
                    message: action.message
                }
            }
        case CLEAR_TOAST:
            return {
                ...state,
                toast: initialState.toast
            }
        case SHOW_LOADING:
            return {
                ...state,
                loading: action.bool
            }
        default:
            return state
    }
}

export default global