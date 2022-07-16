import { createSelector } from "@reduxjs/toolkit";

export const postSelector = createSelector(state => state && state.posts && state.posts.posts, postSelector => postSelector)
export const commentsSelector = createSelector(state => state && state.posts && state.posts.comments, commentsSelector => commentsSelector)
export const profilePostsSelector = createSelector(state => state && state.posts && state.posts.posts, profilePostsSelector => profilePostsSelector)