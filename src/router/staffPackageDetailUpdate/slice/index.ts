import { injectReducer } from "@/store";
import generateActions from "./generateActions";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const initialState = {
    id: "",
    name: "",
    estimatedPrice: 0,
    discount: 0,
    services: [{ id: 0, name: "" }],
    productDetails: [
        { id: 0, displayPrice: 0, productName: "", images: [{ imageUrl: "" }] },
    ],
    packageImages: [{ id: 0, imageUrl: "" }],
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
                discount: state.discount,
                services: state.services,
                productDetails: state.productDetails,
                packageName: state.packageName,
                packageImages: state.packageImages,
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
