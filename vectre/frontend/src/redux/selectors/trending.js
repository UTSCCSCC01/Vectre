import { createSelector } from "@reduxjs/toolkit";

export const trendingUsersSelector = createSelector(state => state && state.trending && state.trending.users, trendingUsersSelector => trendingUsersSelector)
export const trendingCommunitiesSelector = createSelector(state => state && state.trending && state.trending.communities, trendingCommunitiesSelector => trendingCommunitiesSelector)