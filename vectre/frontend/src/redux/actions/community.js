import {
    GET_COMMUNITY,
    STORE_COMMUNITY
} from "../constants/community";

export const getCommunity = (communityID) => ({
    type: GET_COMMUNITY,
    communityID
})
export const storeCommunity = (community) => ({
    type: STORE_COMMUNITY,
    community
})