import { injectReducer } from "@/store";
import generateActions from "./generateActions";
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  id: "",
  name: "",
  description: "",
  estimatedPrice: 0,
  discount: 0,
  services: [],
  productDetails: [],
  packageImages: [],
};

export const name = "ViewPackageStaff";

const slice = createSlice({
  name,
  initialState,
  reducers: {
    ...generateActions(initialState),

    modal_confirm: (state: any, action: any) => {
      state.modal.confirm = action.payload;
    },
    setPackage: (state: any, action: any) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.description = action.payload.description;
      state.estimatedPrice = action.payload.estimatedPrice;
      state.discount = action.payload.discount;
      state.services = action.payload.services;
      state.productDetails = action.payload.productDetails;
      state.packageName = action.payload.packageName;
      state.packageImages = action.payload.packageImages;
    },
    getPackageInfo: (state: any) => {
      state.info = {
        id: state.id,
        name: state.name,
        description: state.description,
        estimatedPrice: state.estimatedPrice,
        discount: state.discount,
        services: state.services,
        productDetails: state.productDetails,
        packageName: state.packageName,
        packageImages: state.packageImages,
      };
    },
  },
});

injectReducer(name, slice.reducer);

export const { actions } = slice;
