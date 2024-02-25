import { injectReducer } from "@/store";
import generateActions from "./generateActions";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { addProductDetails } from "@/router/productDetails/slice";

export const initialState = {
  services: [],
  productDetails: [],
  productDetailsIds: [],
};

export const name = "updateCart";

const slice = createSlice({
  name,
  initialState,
  reducers: {
    ...generateActions(initialState),

    modal_confirm: (state: any, action: any) => {
      state.modal.confirm = action.payload;
    },
    addProductDetailsIds: (state: any, action: PayloadAction<string>) => {
      state.productDetailsIds.push(action.payload);
    },
    addProduct: (state: any, action: any | null) => {
      state.productDetails.push({
        ...action.payload.details[0],
        productName: action.payload.productName,
      });
    },
    addService: (state: any, action: any | null) => {
      state.services.push(action.payload);
    },
    deleteProduct: (state: any, action: PayloadAction<string>) => {
      const productIdToDelete = action.payload;
      const indexToDelete = state.productDetails.findIndex(
        (product: any) => product.id === productIdToDelete
      );

      if (indexToDelete !== -1) {
        state.productDetails.splice(indexToDelete, 1);
      }
    },
    deleteSerivce: (state: any, action: PayloadAction<string>) => {
      const productIdToDelete = action.payload;
      const indexToDelete = state.services.findIndex(
        (product: any) => product.id === productIdToDelete
      );

      if (indexToDelete !== -1) {
        state.services.splice(indexToDelete, 1);
      }
    },
    deleteManyService: (state: any, action: PayloadAction<string[]>) => {
      const idsToDelete = action.payload;

      idsToDelete.forEach((id: string) => {
        const indexToDelete = state.services.findIndex(
          (product: any) => product.id === id
        );

        if (indexToDelete !== -1) {
          state.services.splice(indexToDelete, 1);
        }
      });
    },
    deleteManyProducts: (state: any, action: PayloadAction<string[]>) => {
      const idsToDelete = action.payload;

      idsToDelete.forEach((id: string) => {
        const indexToDelete = state.productDetails.findIndex(
          (product: any) => product.id === id
        );

        if (indexToDelete !== -1) {
          state.productDetails.splice(indexToDelete, 1);
        }
      });
    },
  },
});

injectReducer(name, slice.reducer);

export const { actions } = slice;
