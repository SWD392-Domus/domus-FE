import { getGoogleAuthRequest } from "@/router/login/constants";
import { post } from "./ApiCaller";
let loginUrl = `/Auth/login`;
let GooogleAuth = `/Auth/google-oauth`;
export const loginApi = {
    login: (email: string, password: string) => {
        return post(loginUrl, { email, password });
    },
    googleAuth: (code: string) => {
        return post(GooogleAuth, getGoogleAuthRequest(code));
    },
};
