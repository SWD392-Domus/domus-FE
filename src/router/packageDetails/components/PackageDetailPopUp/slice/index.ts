import { injectReducer } from "@/store";
import generateActions from "./generateActions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState = {
  packageB: {},
};

export const name = "CustomizePackagePopUp";

const slice = createSlice({
  name,
  initialState,
  reducers: {
    ...generateActions(initialState),

    modal_confirm: (state: any, action: any) => {
      state.modal.confirm = action.payload;
    },
    setPackageB: (state: any, action: any) => {
      state.packageB = action.payload;
    },
    incrementQuantity: (state: any, action: PayloadAction<string>) => {
      state.packageB.productDetails.forEach((productDetail: any) => {
        if (productDetail.id == action.payload) {
          productDetail.quantity += 1;
        }
      });
    },
    decrementQuantity: (state: any, action: PayloadAction<string>) => {
      state.packageB.productDetails.forEach((productDetail: any) => {
        if (productDetail.id == action.payload && productDetail.quantity > 1) {
          productDetail.quantity -= 1;
        }
      });
    },
    deleteProduct: (state: any, action: PayloadAction<string>) => {
      state.packageB.productDetails = state.packageB.productDetails.filter(
        (productDetail: any) => productDetail.id != action.payload
      );
    },
    addProduct: (state: any, action: PayloadAction<any>) => {
      for (let i = 0; i < state.packageB.productDetails.length; i++) {
        const productDetail = state.packageB.productDetails[i];
        if (productDetail.id == action.payload.id) {
          productDetail.quantity += 1;
          return;
        }
      }
      action.payload.quantity = 1;
      state.packageB.productDetails.push(action.payload);
    },
  },
});

injectReducer(name, slice.reducer);

export const { actions } = slice;
