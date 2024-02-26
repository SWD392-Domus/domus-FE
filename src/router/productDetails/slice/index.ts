import {
    ProductDetailsProps,
    SingleProductProps,
} from "@/router/productDetails/type";
import { injectReducer } from "../../../store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ProductState {
    product: SingleProductProps | null;
}
export const initialState: ProductState = {
    product: null,
};
export const name = "product";
const slice = createSlice({
    name,
    initialState,
    reducers: {
        setProduct: (state, action) => {
            state.product = action.payload; // Set product
        },
        deleteOneDetail: (state, action) => {
            if (state.product) {
                state.product.details = state.product.details.filter(
                    (detail) => detail.id !== action.payload
                );
            }
        },
        setProductDetails: (state, action) => {
            if (state.product) {
                const { updatedDetail } = action.payload;
                state.product.details = state.product.details.map((detail) =>
                    detail.id === updatedDetail.id
                        ? { ...detail, ...updatedDetail }
                        : detail
                );
            }
        },
        addProductDetails: (state, action) => {
            if (state.product) {
                state.product.details = [
                    ...state.product.details,
                    action.payload,
                ];
            }
        },
        setOrUpdateDetail: (
            state,
            action: PayloadAction<ProductDetailsProps>
        ) => {
            if (state.product) {
                const updatedDetail = action.payload;
                const index = state.product.details.findIndex(
                    (detail) => detail.id === updatedDetail.id
                );
                if (index !== -1) {
                    state.product.details[index] = updatedDetail; // Update existing detail
                } else {
                    state.product.details.push(updatedDetail); // Add new detail if it doesn't exist
                }
            }
        },
    },
});
injectReducer(name, slice.reducer);

export const {
    setProduct,
    deleteOneDetail,
    setProductDetails,
    addProductDetails,
    setOrUpdateDetail,
} = slice.actions;
