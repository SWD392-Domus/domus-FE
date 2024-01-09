import { injectReducer } from "../../../store";
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    count: 0,
};

export const name = "importedList";
const slice = createSlice({
    name,
    initialState,
    reducers: {
        increase: (state) => {
            state.count++;
        },
        decrease: (state) => {
            state.count--;
        },
        addAmount: (state, action) => {
            state.count = action.payload;
        },
    },
});

injectReducer(name, slice.reducer);

export const { increase, decrease, addAmount } = slice.actions;
