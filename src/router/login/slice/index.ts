import { injectReducer } from "@/store";
import generateActions from "./generateActions";
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    user: {
        id: "",
        email: "",
        userName: "",
        fullName: "",
        gender: "",
        address: null,
        phoneNumber: null,
        profileImage: "",
    },
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
            state.user.fullName = fullName;
            state.user.id = id;
            state.user.email = email;
            state.user.userName = userName;
            state.user.gender = gender;
            state.user.address = address;
            state.user.phoneNumber = phoneNumber;
            state.user.profileImage = profileImage;
        },
        setId: (state: any, action: any) => {
            state.user.id = action.payload;
        },
        setEmail: (state: any, action: any) => {
            state.user.email = action.payload as string;
        },
    },
});

injectReducer(name, slice.reducer);

export const { actions } = slice;
