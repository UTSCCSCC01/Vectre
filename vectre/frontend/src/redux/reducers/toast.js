import {
    STORE_TOAST,
    DELETE_TOAST,
} from "../constants/toast";

const initialState = {
    status: "",
    message: ""
}

const toast = (state = initialState, action) => {
    switch (action.type) {
        case STORE_TOAST:
            return {
                ...state,
                status: action.status,
                message: action.message
            }
        case DELETE_TOAST:
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