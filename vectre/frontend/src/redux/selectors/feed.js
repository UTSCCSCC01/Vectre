import { createSelector } from "@reduxjs/toolkit";

export const feedSelector = createSelector(state => state && state.feed && state.feed.feed, feedSelector => feedSelector)
export const feedIndexSelector = createSelector(state => state && state.feed && state.feed.feedIndex, feedIndexSelector => feedIndexSelector)
export const feedPaginationCompleteSelector = createSelector(state => state && state.feed && state.feed.feedPaginationComplete, feedPaginationCompleteSelector => feedPaginationCompleteSelector)
export const feedSortTypeSelector = createSelector(state => state && state.feed && state.feed.feedSortType, feedSortTypeSelector => feedSortTypeSelector)
