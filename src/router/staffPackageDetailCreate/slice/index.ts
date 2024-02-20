import { injectReducer } from "@/store";
import generateActions from "./generateActions";
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  name: "",
  discount: 0,
  serviceIds: [""],
  productDetailIds: [""],
  images: [""],
};

export const name = "CreatePackage";

const slice = createSlice({
  name,
  initialState,
  reducers: {
    ...generateActions(initialState),

    modal_confirm: (state: any, action: any) => {
      state.modal.confirm = action.payload;
    },
    setPackage: (state: any, action: any) => {
      state.name = action.payload.name;
      state.discount = action.payload.discount;
      state.serviceIds = action.payload.serviceIds;
      state.productDetailIds = action.payload.productDetailIds;
      state.images = action.payload.images;
    },
    getPackageInfo: (state: any) => {
      state.info = {
        name: state.name,
        discount: state.discount,
        serviceIds: state.serviceIds,
        productDetailIds: state.productDetailIds,
        images: state.images,
      };
    },
  },
});

injectReducer(name, slice.reducer);

export const { actions } = slice;
