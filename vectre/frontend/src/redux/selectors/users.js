import {createSelector} from "@reduxjs/toolkit";

export const userSelector = createSelector(state => state && state.users && state.users.user, usersSelector => usersSelector)
export const usersSelector = createSelector(state => state && state.users && state.users.users, usersSelector => usersSelector)
export const loggedInUserSelector = createSelector(state => state && state.users && state.users.loggedInUser, loggedInUserSelector => loggedInUserSelector)
export const nonceSelector = createSelector(state => state && state.users && state.users.nonce, nonceSelector => nonceSelector)
