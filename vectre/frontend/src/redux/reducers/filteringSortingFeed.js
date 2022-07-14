import {UPLOAD_DATE, NUMBER_OF_LIKES, LONG_READS, SHORT_READS, WITH_IMAGES, NO_IMAGES, DEFAULT} from "../constants/filteringSortingFeed"

const initialState = {
    sorting: DEFAULT, 
    filtering: DEFAULT
}

const filteringSortingFeed = (state = initialState, action) => {
    switch (action.type) {
        case UPLOAD_DATE:
            return {
                ...state, 
                sorting: UPLOAD_DATE
            }
        case NUMBER_OF_LIKES: 
            return{
                ...state, 
                sorting: NUMBER_OF_LIKES, 
            }
        case LONG_READS: 
            return{
                ...state, 
                filtering: LONG_READS, 
            }
        case SHORT_READS: 
            return{
                ...state, 
                filtering: SHORT_READS, 
            }
        case WITH_IMAGES: 
            return{
                ...state, 
                filtering: WITH_IMAGES, 
            }
        case NO_IMAGES: 
            return{
                ...state, 
                filtering: NO_IMAGES, 
            }
        default:
            return state
    }
}

export default filteringSortingFeed