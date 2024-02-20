import { initialState, name } from "./";

import generateSelectors from "./generateSelectors";
import { createSelector } from "@reduxjs/toolkit";

const selectDomain = (state: any) => state[name] || initialState;

const selector: any = {
  ...generateSelectors(initialState, selectDomain),
  modal: {
    confirm: createSelector([selectDomain], (state) => state.modal.confirm),
  },
};

export default selector;
