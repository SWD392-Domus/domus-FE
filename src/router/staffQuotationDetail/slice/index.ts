import { injectReducer } from "@/store";
import generateActions from "./generateActions";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductDetailProps, ServiceProps } from "../types";
export type QuotationDetailInfo = {
    id: string;
    productName: string;
    price: number;
    monetaryUnit: string;
    quantity: number;
    quantityType: string;
    priceSum: number;
};
export const initialState = {
    id: "",
    staff: {},
    customer: {},
    status: "",
    totalPrice: 0,
    expireAt: "",
    products: [],
    negotiationLog: {},
    services: [],
};
type User = {
    id: string;
    email: string;
    userName: string;
    fullName: string | null;
    gender: string | null;
    address: string | null;
    phoneNumber: string | null;
    profileImage: string;
};
export const name = "viewQuotation";
const recalculateTotalPrice = (
    products: QuotationDetailInfo[],
    services: ServiceProps[]
) => {
    let total = 0;
    products.map((product: QuotationDetailInfo) => {
        total +=
            parseFloat(product.price.toString()) *
            parseFloat(product.quantity.toString());
    });
    services.map((service: ServiceProps) => {
        total += parseFloat(service.price.toString());
    });
    return total;
};
const slice = createSlice({
    name,
    initialState,
    reducers: {
        ...generateActions(initialState),

        modal_confirm: (state: any, action: any) => {
            state.modal.confirm = action.payload;
        },

        setQuotation: (state: any, action: any) => {
            state.id = action.payload.id;
            state.customer = action.payload.customer;
            state.staff = action.payload.staff;
            state.status = action.payload.status;
            state.totalPrice = Number.parseFloat(action.payload.totalPrice);
            state.expireAt = action.payload.expireAt;
            state.products = action.payload.products;
            state.negotiationLog = action.payload.negotiationLog;
            state.services = action.payload.services;
        },
        setUser: (state: any, action: any) => {
            state.customer = action.payload;
        },
        setDate: (state: any, action: any) => {
            state.expireAt = action.payload;
        },
        getQuotationInfo: (state: any) => {
            state.info = {
                id: state.id,
                customer: state.customer,
                staff: state.staff,
                status: state.status,
                totalPrice: state.totalPrice,
                expireAt: state.expireAt,
                products: state.products,
                negotiationLog: state.negotiationLog,
            };
        },

        addProduct: (state: any, action: any) => {
            state.products = [];
            state.products = action.payload;
            state.totalPrice = recalculateTotalPrice(
                state.products,
                state.services
            );
        },
        addService: (state: any, action: any | null) => {
            state.services = [];
            state.services = action.payload;
            state.totalPrice = recalculateTotalPrice(
                state.products,
                state.services
            );
        },

        addRow: (state: any) => {
            const newProductId = Date.now().toString();
            state.products.push({ producDetailId: newProductId });
        },
        addRowService: (state: any) => {
            const newProductId = Date.now().toString();
            state.services.push({ id: newProductId });
        },

        deleteRow: (state: any, action: PayloadAction<string>) => {
            state.products.splice(action.payload, 1);
            state.totalPrice = recalculateTotalPrice(
                state.products,
                state.services
            );
        },
        deleteServiceRow: (state: any, action: PayloadAction<string>) => {
            state.services.splice(action.payload, 1);
            state.totalPrice = recalculateTotalPrice(
                state.products,
                state.services
            );
        },
    },
});

injectReducer(name, slice.reducer);

export const { actions } = slice;
