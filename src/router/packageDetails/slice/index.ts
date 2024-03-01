import { injectReducer } from "@/store";
import generateActions from "./generateActions";
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  packageA: {},
};

export const name = "ViewPackage";

const slice = createSlice({
  name,
  initialState,
  reducers: {
    ...generateActions(initialState),

    modal_confirm: (state: any, action: any) => {
      state.modal.confirm = action.payload;
    },
    setPackage: (state: any, action: any) => {
      state.packageA = action.payload;
    },
    // getPackageInfo: (state: any) => {
    //   state.info = {
    //     id: state.id,
    //     name: state.name,
    //     estimatedPrice: state.estimatedPrice,
    //     discount: state.discount,
    //     services: state.services,
    //     productDetails: state.productDetails,
    //     packageName: state.packageName,
    //     packageImages: state.packageImages,
    //   };
    // },
  },
});

injectReducer(name, slice.reducer);

export const { actions } = slice;
