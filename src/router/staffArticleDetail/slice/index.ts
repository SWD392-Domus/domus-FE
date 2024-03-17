import { injectReducer } from "@/store";
import generateActions from "./generateActions";
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  id: "",
  title: "",
  content: "",
};

export const name = "UpdateArticle";

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
      state.title = action.payload.title;
      state.content = action.payload.content;
    },
    getArticleInfo: (state: any) => {
      state.info = {
        id: state.id,
        title: state.title,
        content: state.content,
      };
    },
  },
});

injectReducer(name, slice.reducer);

export const { actions } = slice;
