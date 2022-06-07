import { GET_CREATE } from "../constants/create";

const initialState = {
    response: {}
}

const create = (state = initialState, action) => {
    switch (action.type) {
        case GET_CREATE:
            return {
                ...state,
                response: action.response,
            }
        default:
            return state
    }
}

export default create