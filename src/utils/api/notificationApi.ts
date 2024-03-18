import { get } from "./ApiCaller";

export const notificationApi = {
    getNotification: (token: string) => {
        return get("/Notification", {}, { Authorization: token });
    },
};
