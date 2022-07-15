import { createSelector } from "@reduxjs/toolkit";

export const postSelector = createSelector(state => state && state.posts && state.posts.post, postSelector => postSelector)
export const commentsSelector = createSelector(state => state && state.posts && state.posts.comments, commentsSelector => commentsSelector)
export const feedSelector = createSelector(state => state && state.posts && state.posts.feed, feedSelector => feedSelector)
export const feedIndexSelector = createSelector(state => state && state.posts && state.posts.feedIndex, feedIndexSelector => feedIndexSelector)
export const feedPaginationCompleteSelector = createSelector(state => state && state.posts && state.posts.feedPaginationComplete, feedPaginationCompleteSelector => feedPaginationCompleteSelector)
