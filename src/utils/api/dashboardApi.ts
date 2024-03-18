import { get } from "./ApiCaller";

export const dashboardApi = {
    getDashboard: (token: string, year: string) => {
        return get(
            `/Admin/dashboard?Year=${year}`,
            {},
            { Authorization: token }
        );
    },
};
