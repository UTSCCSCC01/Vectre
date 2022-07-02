import { createSelector } from "@reduxjs/toolkit";

export const postSelector = createSelector(state => state && state.posts && state.posts.post, postSelector => postSelector)
export const commentsSelector = createSelector(state => state && state.posts && state.posts.comments, commentsSelector => commentsSelector)
