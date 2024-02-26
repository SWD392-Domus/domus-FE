import { injectReducer } from "@/store";
import generateActions from "./generateActions";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const initialState = {
  product: {},
  fields: [],
  cartNumber: 0,
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
    setCartNumber: (state: any, action: any) => {
      state.cartNumber = action.payload;
    },
    increaseCartNumber: (state: any, action: any) => {
      state.cartNumber += action.payload;
    },
    decreaseCartNumber: (state: any, action: any) => {
      state.cartNumber -= action.payload;
    },
    resetCartNumber: (state: any, action: any) => {
      state.cartNumber = 0;
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
            value.ids.some((idObject: any) => idObject.id === payloadItem.id)
          )
        );
      });
    },
  },
});

injectReducer(name, slice.reducer);

export const { actions } = slice;
