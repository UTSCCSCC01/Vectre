import { GET_LOGIN } from "../constants/login";

const initialState = {
    response: {}
}

const login = (state = initialState, action) => {
    switch (action.type) {
        case GET_LOGIN:
            return {
                ...state,
                response: action.response,
            }
        default:
            return state
    }
}

export default login