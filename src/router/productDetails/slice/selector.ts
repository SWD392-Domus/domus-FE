import { name, initialState } from ".";

import { createSelector } from "@reduxjs/toolkit";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const selectedDomain = (state: any) => state[name] || initialState;

export const productSelector = createSelector(
    [selectedDomain],
    (state) => state
);