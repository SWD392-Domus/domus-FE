import { injectReducer } from "@/store";
import generateActions from "./generateActions";
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    id: "",
    email: "",
    userName: "",
    fullName: "",
    gender: "",
    address: null,
    phoneNumber: null,
    profileImage: "",
};

export const name = "user";

const slice = createSlice({
    name,
    initialState,
    reducers: {
        ...generateActions(initialState),
        setUser: (state: any, action: any) => {
            const {
                id,
                email,
                userName,
                fullName,
                gender,
                address,
                phoneNumber,
                profileImage,
            } = action.payload;
            state.fullName = fullName;
            state.id = id;
            state.email = email;
            state.userName = userName;
            state.gender = gender;
            state.address = address;
            state.phoneNumber = phoneNumber;
            state.profileImage = profileImage;
        },
    },
});

injectReducer(name, slice.reducer);

export const { actions } = slice;
