import { get } from "./ApiCaller";

export const notificationApi = {
    getNotification: (token: string, size: number) => {
        return get(
            `/Notification/my-notification?PageSize=${size}&PageIndex=1`,
            {},
            { Authorization: token }
        );
    },
};
