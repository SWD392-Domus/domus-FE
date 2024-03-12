import { injectReducer } from "@/store";
import generateActions from "./generateActions";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ArticleImageProps } from "../types";

export const initialState = {
  id: "",
  name: "",
  description: "",
  estimatedPrice: 0,
  discount: 0,
  services: [],
  productDetails: [],
  articleImages: [] as ArticleImageProps[],
};

export const name = "UpdateArticle";

const slice = createSlice({
  name,
  initialState,
  reducers: {
    ...generateActions(initialState),

    modal_confirm: (state: any, action: any) => {
      state.modal.confirm = action.payload;
    },
    setArticle: (state: any, action: any) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.description = action.payload.description;
      state.estimatedPrice = action.payload.estimatedPrice;
      state.discount = action.payload.discount;
      state.services = action.payload.services;
      state.productDetails = action.payload.productDetails;
      state.articleName = action.payload.articleName;
      state.articleImages = action.payload.articleImages;
    },
    getArticleInfo: (state: any) => {
      state.info = {
        id: state.id,
        name: state.name,
        estimatedPrice: state.estimatedPrice,
        description: state.description,
        discount: state.discount,
        services: state.services,
        productDetails: state.productDetails,
        articleName: state.articleName,
        articleImages: state.articleImages,
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
    updateArticleImages: (
      state,
      action: PayloadAction<ArticleImageProps[]>
    ) => {
      state.articleImages = [...state.articleImages, ...action.payload];
    },
  },
});

injectReducer(name, slice.reducer);

export const { actions } = slice;
