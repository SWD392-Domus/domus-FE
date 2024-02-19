import { name, initialState } from "./";

import { createSelector } from "@reduxjs/toolkit";

const selectedDomain = (state: any) => state[name] || initialState;

export const counterSelector = createSelector(
    [selectedDomain],
    (state) => state
);
