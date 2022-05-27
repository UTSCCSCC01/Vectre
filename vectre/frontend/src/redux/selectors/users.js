import {createSelector} from "@reduxjs/toolkit";

export const usersSelector = createSelector(state => state && state.users && state.users.users, usersSelector => usersSelector)
