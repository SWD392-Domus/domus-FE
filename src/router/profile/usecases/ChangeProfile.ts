import { changeProfileService } from "../services";

export const changeProfile = (token: string, data: any) => {
    return changeProfileService(token, data);
};
