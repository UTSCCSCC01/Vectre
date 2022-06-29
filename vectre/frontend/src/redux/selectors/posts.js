import { createSelector } from "@reduxjs/toolkit";

export const commentsSelector = createSelector(state => state && state.posts && state.posts.comments, commentsSelector => commentsSelector)
