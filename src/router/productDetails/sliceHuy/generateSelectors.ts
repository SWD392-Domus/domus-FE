import { createSelector } from "@reduxjs/toolkit";

const generateSelectors = (initialState: any, selectDomain: any) => {
  const keys = Object.keys(initialState);

  return keys.reduce((acc, key) => {
    return {
      ...acc,
      [key]: createSelector([selectDomain], (state) => state[key]),
    };
  }, {});
};

export default generateSelectors;
