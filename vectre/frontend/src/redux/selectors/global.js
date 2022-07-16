import {createSelector} from "@reduxjs/toolkit";

export const toastSelector = createSelector(state => state && state.global && state.global.toast, toastSelector => toastSelector)
export const loadingSelector = createSelector(state => state && state.global && state.global.loading, loadingSelector => loadingSelector)