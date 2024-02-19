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
    },
});
injectReducer(name, slice.reducer);

export const { setProduct } = slice.actions;
