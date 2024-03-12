import { injectReducer } from "@/store";
import generateActions from "./generateActions";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const initialState = {
  id: "",
  name: "",
  description: "",
};

export const name = "CreateArticle";

const slice = createSlice({
  name,
  initialState,
  reducers: {
    ...generateActions(initialState),

    modal_confirm: (state: any, action: any) => {
      state.modal.confirm = action.payload;
    },
    setArticle: (state: any, action: any) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.description = action.payload.description;
    },
    resetArticle: (state: any) => {
      state.id = "";
      state.name = "";
      state.description = "";
    },
    getArticleInfo: (state: any) => {
      state.info = {
        id: state.id,
        name: state.name,
        description: state.description,
      };
    },
  },
});

injectReducer(name, slice.reducer);

export const { actions } = slice;
