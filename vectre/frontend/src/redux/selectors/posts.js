import { createSelector } from "@reduxjs/toolkit";

export const postSelector = createSelector(state => state && state.posts && state.posts.posts, postSelector => postSelector)
export const commentsSelector = createSelector(state => state && state.posts && state.posts.comments, commentsSelector => commentsSelector)
export const profilePostsSelector = createSelector(state => state && state.posts && state.posts.posts, profilePostsSelector => profilePostsSelector)
export const feedSelector = createSelector(state => state && state.posts && state.posts.feed, feedSelector => feedSelector)
export const feedIndexSelector = createSelector(state => state && state.posts && state.posts.feedIndex, feedIndexSelector => feedIndexSelector)
export const feedPaginationCompleteSelector = createSelector(state => state && state.posts && state.posts.feedPaginationComplete, feedPaginationCompleteSelector => feedPaginationCompleteSelector)
export const feedSortTypeSelector = createSelector(state => state && state.posts && state.posts.feedSortType, feedSortTypeSelector => feedSortTypeSelector)
