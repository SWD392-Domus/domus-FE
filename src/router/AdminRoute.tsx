// import { Navigate, Outlet } from "react-router-dom";
import Loading from "@/components/PublicComponents/Loading";
import { toastError } from "@/components/Toast";
import { useAuth } from "@/components/customHooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
// import useAuth from "../utils/useAuth";
// import { toastError } from "../components/Toast";

const AdminRoute = () => {
    const { userRoles, loading } = useAuth();
    if (loading) {
        // Render a loading spinner or placeholder while authentication is being checked
        return <Loading variant="dark" />;
    }

    if (userRoles === null) {
        // User is not logged in, handle accordingly
        toastError("Please Login First");
        return <Navigate to="/login" replace />;
    }

    // Assuming 'userRole' is set to 'role' in your JWT payload
    // Adjust this condition based on your JWT structure
    if (!userRoles.includes("Admin")) {
        // User does not have the required role, redirect to a forbidden page
        return <Navigate to="/403" replace />;
    }

    // User has the required role, render the child components
    return <Outlet />;
};

export default AdminRoute;
