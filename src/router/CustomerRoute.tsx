// import { Navigate, Outlet } from "react-router-dom";
import { Outlet } from "react-router-dom";
// import useAuth from "../utils/useAuth";
// import { toastError } from "../components/Toast";

const CustomerRoute = () => {
    // const { userRole } = useAuth();

    // if (userRole === undefined) {
    //     toastError("Please Login First");
    //     return <Navigate to="/login" replace />;
    // } else if (userRole === null) {
    //     return <Outlet />;
    // }
    // return userRole === 'admin' || userRole === 'saler' || userRole === 'guard' ? (
    // <Outlet />
    // ) : (
    //     <Navigate to="/403" replace />
    // );
    return <Outlet />
};

export default CustomerRoute;
