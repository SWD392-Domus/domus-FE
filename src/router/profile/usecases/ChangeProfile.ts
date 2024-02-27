import { changeProfileService } from "../services";

export const changeProfile = (
    token: string,
    data: HTMLElement | null | undefined
) => {
    return changeProfileService(token, data);
};
