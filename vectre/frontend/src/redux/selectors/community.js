import { createSelector } from "@reduxjs/toolkit";

export const communitySelector = createSelector(state => state && state.community && state.community.community, communitySelector => communitySelector)
export const searchedCommunitiesSelector = createSelector(state => state && state.community && state.community.searchedCommunities, searchedCommunitiesSelector => searchedCommunitiesSelector)
export const loggedInUserRolesSelector = createSelector(state => state && state.community && state.community.loggedInUserRoles, loggedInUserRolesSelector => loggedInUserRolesSelector)