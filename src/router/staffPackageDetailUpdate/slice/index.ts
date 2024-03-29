import { injectReducer } from "@/store";
import generateActions from "./generateActions";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PackageImageProps } from "../types";

export const initialState = {
  id: "",
  name: "",
  description: "",
  estimatedPrice: 0,
  discount: 0,
  services: [],
  productDetails: [],
  packageImages: [] as PackageImageProps[],
};

export const name = "UpdatePackage";

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
        estimatedPrice: state.estimatedPrice,
        description: state.description,
        discount: state.discount,
        services: state.services,
        productDetails: state.productDetails,
        packageName: state.packageName,
        packageImages: state.packageImages,
      };
    },
    addProduct: (state: any, action: any | null) => {
      for (let i = 0; i < state.productDetails.length; i++) {
        const productDetail = state.productDetails[i];
        if (productDetail.id == action.payload.details[0].id) {
          productDetail.quantity += action.payload.quantity;
          return;
        }
      }
      state.productDetails.push({
        ...action.payload.details[0],
        productName: action.payload.productName,
        quantity: action.payload.quantity,
      });
    },
    addService: (state: any, action: any | null) => {
      for (let i = 0; i < state.services.length; i++) {
        const service = state.services[i];
        if (service.id == action.payload.id) {
          return;
        }
      }
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
    updatePackageImages: (
      state,
      action: PayloadAction<PackageImageProps[]>
    ) => {
      state.packageImages = [...state.packageImages, ...action.payload];
    },
  },
});

injectReducer(name, slice.reducer);

export const { actions } = slice;
