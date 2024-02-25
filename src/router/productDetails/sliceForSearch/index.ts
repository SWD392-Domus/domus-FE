import { injectReducer } from "@/store";
import generateActions from "./generateActions";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const initialState = {
  size: null,
  color: null,
  material: null,
};

export const name = "searchProductDetails";

const slice = createSlice({
  name,
  initialState,
  reducers: {
    ...generateActions(initialState),

    modal_confirm: (state: any, action: any) => {
      state.modal.confirm = action.payload;
    },
    setSize: (state: any, action: PayloadAction<string>) => {
      state.size = action.payload;
    },
    setColor: (state: any, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
    setMaterial: (state: any, action: PayloadAction<string>) => {
      state.material = action.payload;
    },
  },
});

injectReducer(name, slice.reducer);

export const { actions } = slice;
