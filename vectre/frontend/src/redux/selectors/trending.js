import { createSelector } from "@reduxjs/toolkit";

export const trendingCommunitiesSelector = createSelector(state => state && state.trending && state.trending.communities, trendingCommunitiesSelector => trendingCommunitiesSelector)