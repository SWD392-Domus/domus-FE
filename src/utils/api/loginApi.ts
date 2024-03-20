import { getGoogleAuthRequest } from "@/router/login/constants";
import { post } from "./ApiCaller";
let loginUrl = `/Auth/login`;
let registerUrl = `/Auth/register`;
let GooogleAuth = `/Auth/google-oauth`;
export const loginApi = {
    login: (email: string, password: string) => {
        return post(loginUrl, { email, password });
    },
    register: (email: string, password: string) => {
        return post(registerUrl, { email, password });
    },
    googleAuth: (code: string) => {
        return post(GooogleAuth, getGoogleAuthRequest(code));
    },
    confirmOtp: (id: string, otp: string, token: string) => {
        return post(
            `/Auth/confirm-otp`,
            { id: id, otp: otp },
            {},
            { Authorization: token }
        );
    },
};
