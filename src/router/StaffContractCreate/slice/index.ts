import { injectReducer } from "@/store";
import generateActions from "./generateActions";
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    quotaitonId: "",
    revisionId: "",
};

export const name = "contractCreation";

const slice = createSlice({
    name,
    initialState,
    reducers: {
        ...generateActions(initialState),

        modal_confirm: (state: any, action: any) => {
            state.modal.confirm = action.payload;
        },
    },
});

injectReducer(name, slice.reducer);

export const { actions } = slice;
