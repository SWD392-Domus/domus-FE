import { get, put } from "./ApiCaller";
let ownProfileURL = `/Users/self-profile`;
let allUserEndpoint = `/Users/all`;
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
    getAllUser: (token: string) => {
        return get(allUserEndpoint, {}, { Authorization: ` Bearer ${token}` });
    },
    getStaff: (token: string) => {
        return get("/Users/staff", {}, { Authorization: ` Bearer ${token}` });
    }
};
