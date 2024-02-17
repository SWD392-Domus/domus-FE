import { post } from "./ApiCaller";
let loginUrl = `/Auth/login`;
export const loginApi = {
    login: (email: string, password: string) => {
        return post(loginUrl, { email, password });
    },
};
