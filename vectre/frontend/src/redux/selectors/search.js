import {createSelector} from "@reduxjs/toolkit";

export const searchedUsersSelector = createSelector(state => state && state.search && state.search.users, searchedUsersSelector => searchedUsersSelector)
export const searchedCommunitiesSelector = createSelector(state => state && state.search && state.search.communities, searchedCommunitiesSelector => searchedCommunitiesSelector)
export const searchedPostsSelector = createSelector(state => state && state.search && state.search.posts, searchedPostsSelector => searchedPostsSelector)

export const searchedUserCommunitiesFilterSelector = createSelector(state => state && state.search && state.search.usersCommunitiesFilter, searchedUserCommunitiesFilterSelector => searchedUserCommunitiesFilterSelector)

export const searchedPostsIndexSelector = createSelector(state => state && state.search && state.search.postsIndex, searchedPostsIndexSelector => searchedPostsIndexSelector)
export const searchedPostsPaginationCompleteSelector = createSelector(state => state && state.search && state.search.postsPaginationComplete, searchedPostsPaginationCompleteSelector => searchedPostsPaginationCompleteSelector)
export const searchedPostsSortTypeSelector = createSelector(state => state && state.search && state.search.postsSortType, searchedPostsSortTypeSelector => searchedPostsSortTypeSelector)
