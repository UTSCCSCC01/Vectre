import { SHOW_LOADING } from "../constants/loading";

export const showLoading = (bool) => ({
    type: SHOW_LOADING,
    bool
})