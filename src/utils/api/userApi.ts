import { get, put } from "./ApiCaller";
let ownProfileURL = `/Users/self-profile`;

export const userApi = {
    getOwnProfile: (token: string) => {
        return get(`${ownProfileURL}/${token}`);
    },
    changeProfile: (token: string, data: any) => {
        return put(`${ownProfileURL}/${token}`, data);
    }
};
