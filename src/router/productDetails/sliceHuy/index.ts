import { injectReducer } from "@/store";
import generateActions from "./generateActions";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const initialState = {
  product: {},
  fields: [],
};

export const name = "viewProductHuy";

const slice = createSlice({
  name,
  initialState,
  reducers: {
    ...generateActions(initialState),

    modal_confirm: (state: any, action: any) => {
      state.modal.confirm = action.payload;
    },
    setProduct: (state: any, action: any) => {
      state.product = action.payload;
    },
    setFields: (state: any, action: any) => {
      state.fields = action.payload;
    },
    hideValueBasedOnIds: (state: any, action: any) => {
      state.fields.forEach((field: any) => {
        field.values = field.values.filter((value: any) =>
          action.payload.some((payloadItem: any) =>
            value.ids.includes(payloadItem)
          )
        );
      });
    },
  },
});

injectReducer(name, slice.reducer);

export const { actions } = slice;
