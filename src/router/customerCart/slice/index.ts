import { injectReducer } from "@/store";
import generateActions from "./generateActions";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const initialState = {
  services: [],
  productDetails: [],
  cartNumber: 0,
  discount: 0,
  totalPrice: 0,
};

const calculateTotalPrice = (state: any) => {
  const productDetailsSum = state.productDetails.reduce(
    (sum: number, pd: any) => sum + pd.price * pd.quantity,
    0
  );
  const servicesSum = state.services.reduce(
    (sum: number, s: any) => sum + s.price,
    0
  );

  return ((productDetailsSum + servicesSum) * (100 - state.discount)) / 100;
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
      state.totalPrice = calculateTotalPrice(state);
    },
    incrementQuantity: (state: any, action: PayloadAction<string>) => {
      state.productDetails.forEach((productDetail: any) => {
        if (productDetail.id == action.payload) {
          productDetail.quantity += 1;
        }
      });
      localStorage.setItem("cart", JSON.stringify(state.productDetails));
      state.totalPrice = calculateTotalPrice(state);
    },
    decrementQuantity: (state: any, action: PayloadAction<string>) => {
      state.productDetails.forEach((productDetail: any) => {
        if (productDetail.id == action.payload && productDetail.quantity > 1) {
          productDetail.quantity -= 1;
        }
      });
      localStorage.setItem("cart", JSON.stringify(state.productDetails));
      state.totalPrice = calculateTotalPrice(state);
    },
    deleteProduct: (state: any, action: PayloadAction<string>) => {
      state.productDetails = state.productDetails.filter(
        (productDetail: any) => productDetail.id != action.payload
      );
      localStorage.setItem("cart", JSON.stringify(state.productDetails));
      state.cartNumber = state.productDetails.length;
      state.totalPrice = calculateTotalPrice(state);
    },
    addService: (state: any, action: any | null) => {
      state.services.push(action.payload);
      state.totalPrice = calculateTotalPrice(state);
    },
    deleteSerivce: (state: any, action: PayloadAction<string>) => {
      const productIdToDelete = action.payload;
      const indexToDelete = state.services.findIndex(
        (product: any) => product.id === productIdToDelete
      );

      if (indexToDelete !== -1) {
        state.services.splice(indexToDelete, 1);
      }
      state.totalPrice = calculateTotalPrice(state);
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
      state.totalPrice = calculateTotalPrice(state);
    },
  },
});

injectReducer(name, slice.reducer);

export const { actions } = slice;
