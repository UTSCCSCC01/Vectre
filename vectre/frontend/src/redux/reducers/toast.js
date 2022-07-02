import {
    SHOW_TOAST,
    CLEAR_TOAST,
} from "../constants/toast";

const initialState = {
    status: "",
    message: ""
}

const toast = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_TOAST:
            return {
                ...state,
                status: action.status,
                message: action.message
            }
        case CLEAR_TOAST:
            return {
                ...state,
                status: "",
                message: ""
            }
        default:
            return state
    }
}

export default toast