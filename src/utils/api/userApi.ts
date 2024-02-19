import { get } from "./ApiCaller";
let ownProfileURL = `/Users/self-profile`;

export const userApi = {
    getOwnProfile: (token: string) => {
        return get(`${ownProfileURL}/${token}`);
    },
};
