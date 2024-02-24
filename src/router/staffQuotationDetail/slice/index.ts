import { injectReducer } from "@/store";
import generateActions from "./generateActions";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const initialState = {
  id: "",
  staff: {},
  customer: {},
  status: "",
  totalPrice: 0,
  expireAt: "",
  products: [],
  negotiationLog: {},
};

export const name = "viewQuotation";

const slice = createSlice({
  name,
  initialState,
  reducers: {
    ...generateActions(initialState),

    modal_confirm: (state: any, action: any) => {
      state.modal.confirm = action.payload;
    },

    setQuotation: (state: any, action: any) => {
      state.id = action.payload.id;
      state.customer = action.payload.customer;
      state.staff = action.payload.staff;
      state.status = action.payload.status;
      state.totalPrice = action.payload.totalPrice;
      state.expireAt = action.payload.expireAt;
      state.products = action.payload.products;
      state.negotiationLog = action.payload.negotiationLog;
    },
    getQuotationInfo: (state: any) => {
      state.info = {
        id: state.id,
        customer: state.customer,
        staff: state.staff,
        status: state.status,
        totalPrice: state.totalPrice,
        expireAt: state.expireAt,
        products: state.products,
        negotiationLog: state.negotiationLog,
      };
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
