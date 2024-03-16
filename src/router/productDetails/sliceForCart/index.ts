import { injectReducer } from "@/store";
import generateActions from "./generateActions";
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  product: {},
  fields: [],
  cartNumber: 0,
  isCheckedIds: [],
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
    resetCartNumber: (state: any) => {
      state.cartNumber = 0;
    },
    setProduct: (state: any, action: any) => {
      state.product = action.payload;
    },
    setFields: (state: any, action: any) => {
      state.fields = action.payload;
    },
    onClickCheck: (state: any, action: any) => {
      if (!action.payload.isChecked) {
        state.fields.forEach((field: any) => {
          field.values.forEach((value: any) => {
            if (value.value == action.payload.value) {
              value.isChecked = true;
            }
          });
        });
        // const isCheckedIds: string[] = [];
        // state.fields.forEach((field: any) => {
        //   field.values.forEach((value: any) => {
        // if (value.isChecked == true) {
        action.payload.ids.forEach((idAndPrice: any) => {
          if (!state.isCheckedIds.includes(idAndPrice.id)) {
            state.isCheckedIds.push(idAndPrice.id);
          }
        });
        // }
        //   });
        // });
        // console.log(state.isCheckedIds, "isCheckedIds");

        state.fields.forEach((field: any) => {
          field.values.forEach((value: any) => {
            if (value.isChecked == false) {
              value.ids.forEach((idAndPrice: any) => {
                if (!state.isCheckedIds.includes(idAndPrice.id)) {
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

        action.payload.ids.forEach((idAndPrice: any) => {
          if (!state.isCheckedIds.includes(idAndPrice.id)) {
            state.isCheckedIds.push(idAndPrice.id);
          }
        });
        const isCheckedIds: string[] = [];
        state.fields.forEach((field: any) => {
          field.values.forEach((value: any) => {
            if (value.isChecked == true) {
              value.ids.forEach((idAndPrice: any) => {
                if (!isCheckedIds.includes(idAndPrice.id)) {
                  isCheckedIds.push(idAndPrice.id);
                }
              });
            }
          });
        });
        // console.log(isCheckedIds, "isCheckedIds");
        state.isCheckedIds = isCheckedIds;

        state.fields.forEach((field: any) => {
          field.values.forEach((value: any) => {
            if (value.isChecked == false) {
              value.ids.forEach((idAndPrice: any) => {
                if (
                  state.isCheckedIds.length !== 0 &&
                  !state.isCheckedIds.includes(idAndPrice.id)
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
