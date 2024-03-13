import { get, post, put } from "./ApiCaller";
let ownProfileURL = `/Users/self-profile`;
let allUserEndpoint = `/Users/all`;
let UserEndpoint = `/Users`;
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
    getUserById: (id: string,token: string) => {
        return get(`${UserEndpoint}/${id}`, {}, { Authorization: token });
    },
    updateUser: (id: string, data: any, token: string) => {
        return put(`${UserEndpoint}/${id}`, data, {}, { Authorization: token, "Content-Type": "multipart/form-data" });
    },
    createUser: (data: any, token: string,) => {
        return post(UserEndpoint, data,{},{
            Authorization: token
        })
    }
};
