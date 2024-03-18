import { injectReducer } from "@/store";
import generateActions from "./generateActions";
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  id: "",
  name: "",
  price: 0,
};

export const name = "UpdateServicePopUpInServiceList";

const slice = createSlice({
  name,
  initialState,
  reducers: {
    ...generateActions(initialState),

    modal_confirm: (state: any, action: any) => {
      state.modal.confirm = action.payload;
    },
    setService: (state: any, action: any) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.price = action.payload.price;
    },
  },
});

injectReducer(name, slice.reducer);

export const { actions } = slice;
