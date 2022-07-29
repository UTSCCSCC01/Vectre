import {createSelector} from "@reduxjs/toolkit";

export const searchedUsersSelector = createSelector(state => state && state.search && state.search.users, searchedUsersSelector => searchedUsersSelector)
export const searchedCommunitiesSelector = createSelector(state => state && state.search && state.search.communities, searchedCommunitiesSelector => searchedCommunitiesSelector)
export const searchedPostsSelector = createSelector(state => state && state.search && state.search.posts, searchedPostsSelector => searchedPostsSelector)