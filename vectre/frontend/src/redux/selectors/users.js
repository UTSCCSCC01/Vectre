import { createSelector } from "@reduxjs/toolkit";

export const userSelector = createSelector(state => state && state.users && state.users.user, usersSelector => usersSelector)
export const usersSelector = createSelector(state => state && state.users && state.users.users, usersSelector => usersSelector)
export const loggedInUserSelector = createSelector(state => state && state.users && state.users.loggedInUser, loggedInUserSelector => loggedInUserSelector)
export const loggedInUserCommunitiesSelector = createSelector(state => state && state.users && state.users.loggedInUser && state.users.loggedInUser.communities, loggedInUserCommunitiesSelector => loggedInUserCommunitiesSelector)
export const nonceSelector = createSelector(state => state && state.users && state.users.nonce, nonceSelector => nonceSelector)
export const notificationsSelector = createSelector(state => state && state.users && state.users.notifications, notificationsSelector => notificationsSelector)
export const unreadStatusSelector = createSelector(state => state && state.users && state.users.unreadStatus, unreadStatusSelector => unreadStatusSelector)
export const nftSelector = createSelector(state => state && state.users && state.users.nft, nftSelector => nftSelector)
export const fundsSelector = createSelector(state => state && state.users && state.users.funds, fundsSelector => fundsSelector)