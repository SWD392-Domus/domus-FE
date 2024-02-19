import { injectReducer } from "../../../store";
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    isEditMode: false
}
export const name = "isEditMode";
const slice = createSlice({
    name,
    initialState,
    reducers: {
        changeMode: (state) => {
            state.isEditMode = !state.isEditMode // Set product
        },
    },
});
injectReducer(name, slice.reducer);

export const { changeMode } = slice.actions;
