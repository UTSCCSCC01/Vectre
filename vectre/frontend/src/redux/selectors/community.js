import { createSelector } from "@reduxjs/toolkit";

export const communitySelector = createSelector(state => state && state.community && state.community.community, communitySelector => communitySelector)