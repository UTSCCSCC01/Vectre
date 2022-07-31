import { createSelector } from "@reduxjs/toolkit";

export const communitySelector = createSelector(state => state && state.communities && state.communities.community, communitySelector => communitySelector)
export const loggedInUserRolesSelector = createSelector(state => state && state.communities && state.communities.loggedInUserRoles, loggedInUserRolesSelector => loggedInUserRolesSelector)
export const trendingCommunitiesSelector = createSelector(state => state && state.communities && state.communities.trending, trendingCommunitiesSelector => trendingCommunitiesSelector)
export const bannedUsersSelector = createSelector(state => state && state.communities && state.communities.bannedUsers, bannedUsersSelector => bannedUsersSelector)
export const moderatorsSelector = createSelector(state => state && state.communities && state.communities.moderators, moderatorsSelector => moderatorsSelector)