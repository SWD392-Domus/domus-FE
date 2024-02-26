import { get, put } from "./ApiCaller";
let ownProfileURL = `/Users/self-profile`;

export const userApi = {
    getOwnProfile: (token: string) => {
        return get(`${ownProfileURL}/${token}`);
    },
    changeProfile: (
        token: string,
        formData: HTMLElement | null | undefined
    ) => {
        return put(
            `${ownProfileURL}/${token}`,
            formData,
            {},
            { Authorization: token, "Content-Type": "multipart/form-data" }
        );
    },
};
