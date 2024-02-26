import { injectReducer } from "@/store";
import generateActions from "./generateActions";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const initialState = {
  services: [],
  productDetails: [],
  cartNumber: 0,
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
    setCartNumber: (state: any, action: any) => {
      state.cartNumber = action.payload;
    },
    setProductDetails: (state: any, action: any) => {
      state.productDetails = action.payload;
    },
    // addProduct: (state: any, action: any) => {
    //   state.productDetails.forEach((productDetail: any) => {
    //     if (productDetail.id == action.payload.id) {
    //       productDetail.quantity += 1;
    //     } else {
    //       state.productDetails.push({ id: action.payload.id, quantity: 1 });
    //     }
    //   });
    // },
    deleteProduct: (state: any, action: PayloadAction<string>) => {
      const productIdToDelete = action.payload;
      const indexToDelete = state.productDetails.findIndex(
        (product: any) => product.id === productIdToDelete
      );

      if (indexToDelete !== -1) {
        state.productDetails.splice(indexToDelete, 1);
      }
    },
    // deleteManyProducts: (state: any, action: PayloadAction<string[]>) => {
    //   const idsToDelete = action.payload;

    //   idsToDelete.forEach((id: string) => {
    //     const indexToDelete = state.productDetails.findIndex(
    //       (product: any) => product.id === id
    //     );

    //     if (indexToDelete !== -1) {
    //       state.productDetails.splice(indexToDelete, 1);
    //     }
    //   });
    // },
    addService: (state: any, action: any | null) => {
      state.services.push(action.payload);
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
  },
});

injectReducer(name, slice.reducer);

export const { actions } = slice;
