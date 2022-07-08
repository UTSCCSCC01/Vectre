import { createSelector } from "@reduxjs/toolkit";

export const loadingSelector = createSelector(state => state && state.loading && state.loading.loading, loadingSelector => loadingSelector)