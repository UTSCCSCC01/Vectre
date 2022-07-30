import { createSelector } from "@reduxjs/toolkit";

export const communitySelector = createSelector(state => state && state.communities && state.communities.community, communitySelector => communitySelector)
export const loggedInUserRolesSelector = createSelector(state => state && state.communities && state.communities.loggedInUserRoles, loggedInUserRolesSelector => loggedInUserRolesSelector)