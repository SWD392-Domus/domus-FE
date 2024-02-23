import { SingleProductProps } from "@/router/productDetails/type";
import { injectReducer } from "../../../store";
import { createSlice } from "@reduxjs/toolkit";

interface ProductState {
    product: SingleProductProps | null;
}
export const initialState: ProductState = {
    product: null
}
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
                state.product.details = state.product.details.filter(detail => detail.id !== action.payload);
            }
        },
        setProductDetails: (state, action) => {
            if (state.product) {
                const { updatedDetail } = action.payload;
                state.product.details = state.product.details.map(detail =>
                    detail.id === updatedDetail.id ? { ...detail, ...updatedDetail } : detail
                );
            }
        },
        addProductDetails: (state, action) => {
            if (state.product) {
                state.product.details = [...state.product.details, action.payload];
            }
        }
    },
});
injectReducer(name, slice.reducer);

export const { 
    setProduct,
    deleteOneDetail,
    setProductDetails,
    addProductDetails
 } = slice.actions;
