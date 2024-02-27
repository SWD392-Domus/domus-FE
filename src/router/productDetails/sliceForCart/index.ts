import { injectReducer } from "@/store";
import generateActions from "./generateActions";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const initialState = {
  product: {},
  fields: [],
  cartNumber: 0,
};

export const name = "viewProductHuy";

const slice = createSlice({
  name,
  initialState,
  reducers: {
    ...generateActions(initialState),

    modal_confirm: (state: any, action: any) => {
      state.modal.confirm = action.payload;
    },
    setCartNumber: (state: any, action: any) => {
      state.cartNumber = action.payload;
    },
    increaseCartNumber: (state: any, action: any) => {
      state.cartNumber += action.payload;
    },
    decreaseCartNumber: (state: any, action: any) => {
      state.cartNumber -= action.payload;
    },
    resetCartNumber: (state: any, action: any) => {
      state.cartNumber = 0;
    },
    setProduct: (state: any, action: any) => {
      state.product = action.payload;
    },
    setFields: (state: any, action: any) => {
      state.fields = action.payload;
    },
    hideValueBasedOnIds: (state: any, action: any) => {
      if (!action.payload.isChecked) {
        state.fields.forEach((field: any) => {
          field.values.forEach((value: any) => {
            if (value.value == action.payload.value) {
              value.isChecked = true;
            }
          });
        });
        const isCheckedValueIds: string[] = [];
        state.fields.forEach((field: any) => {
          field.values.forEach((value: any) => {
            if (value.isChecked == true) {
              value.ids.forEach((idAndPrice: any) => {
                if (!isCheckedValueIds.includes(idAndPrice.id)) {
                  isCheckedValueIds.push(idAndPrice.id);
                }
              });
            }
          });
        });
        // console.log(isCheckedValueIds, "isCheckedValueIds");

        state.fields.forEach((field: any) => {
          field.values.forEach((value: any) => {
            if (value.isChecked == false) {
              value.ids.forEach((idAndPrice: any) => {
                if (!isCheckedValueIds.includes(idAndPrice.id)) {
                  value.isDisabled = true;
                }
              });
            }
          });
        });
      } else {
        state.fields.forEach((field: any) => {
          field.values.forEach((value: any) => {
            if (value.value == action.payload.value) {
              value.isChecked = false;
            }
          });
        });
        const isCheckedValueIds: string[] = [];
        state.fields.forEach((field: any) => {
          field.values.forEach((value: any) => {
            if (value.isChecked == true) {
              value.ids.forEach((idAndPrice: any) => {
                if (!isCheckedValueIds.includes(idAndPrice.id)) {
                  isCheckedValueIds.push(idAndPrice.id);
                }
              });
            }
          });
        });
        // console.log(isCheckedValueIds, "isCheckedValueIds");

        state.fields.forEach((field: any) => {
          field.values.forEach((value: any) => {
            if (value.isChecked == false) {
              value.ids.forEach((idAndPrice: any) => {
                if (
                  isCheckedValueIds.length !== 0 &&
                  !isCheckedValueIds.includes(idAndPrice.id)
                ) {
                  value.isDisabled = true;
                } else {
                  value.isDisabled = false;
                }
              });
            }
          });
        });
      }
    },
  },
});

injectReducer(name, slice.reducer);

export const { actions } = slice;
