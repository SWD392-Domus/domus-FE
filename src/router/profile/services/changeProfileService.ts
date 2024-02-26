import { userApi } from "@/utils/api/userApi";

export const changeProfileService = (
    token: string,
    data: HTMLElement | null | undefined
) => {
    return userApi.changeProfile(token, data);
};
