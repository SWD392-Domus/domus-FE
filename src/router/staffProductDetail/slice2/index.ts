import { SingleProductProps } from "@/router/productDetails/type";
import { injectReducer } from "../../../store";
import { createSlice } from "@reduxjs/toolkit";

interface ProductState {
    product: SingleProductProps | null;
}
export const initialState: ProductState = {
    product: null
}
export const name = "productCopy";
const slice = createSlice({
    name,
    initialState,
    reducers: {
        setProductCopy: (state, action) => {
            state.product = action.payload; // Set product
        },
        deleteOneDetailCopy: (state, action) => {
            if (state.product) {
                state.product.details = state.product.details.filter(detail => detail.id !== action.payload);
            }
        },
        setProductDetailsCopy: (state, action) => {
            if (state.product) {
                const { updatedDetail } = action.payload;
                state.product.details = state.product.details.map(detail =>
                    detail.id === updatedDetail.id ? { ...detail, ...updatedDetail } : detail
                );
            }
        }
    },
});
injectReducer(name, slice.reducer);

export const { 
    setProductCopy,
    deleteOneDetailCopy,
    setProductDetailsCopy
 } = slice.actions;
