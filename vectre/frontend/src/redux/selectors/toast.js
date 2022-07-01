import {createSelector} from "@reduxjs/toolkit";

export const toastSelector = createSelector(state => state && state.toast, toastSelector => toastSelector)