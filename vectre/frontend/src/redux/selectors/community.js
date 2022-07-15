import { createSelector } from "@reduxjs/toolkit";

export const communitySelector = createSelector(state => state && state.community && state.community.community, communitySelector => communitySelector)
export const loggedInUserRolesSelector = createSelector(state => state && state.community && state.community.loggedInUserRoles, loggedInUserRolesSelector => loggedInUserRolesSelector)

export const communityFeedSelector = createSelector(state => state && state.community && state.community.feed, communityFeedSelector => communityFeedSelector)
export const communityFeedIndexSelector = createSelector(state => state && state.community && state.community.feedIndex, communityFeedIndexSelector => communityFeedIndexSelector)
export const communityFeedPaginationCompleteSelector = createSelector(state => state && state.community && state.community.feedPaginationComplete, communityFeedPaginationCompleteSelector => communityFeedPaginationCompleteSelector)
export const communityFeedSortTypeSelector = createSelector(state => state && state.community && state.community.feedSortType, communityFeedSortTypeSelector => communityFeedSortTypeSelector)