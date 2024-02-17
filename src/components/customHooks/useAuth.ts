import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toastError } from "../Toast";

const getJwtUser = (token: string) => {
    return jwtDecode(token);
};
export const useAuth = () => {
    const [userRole, setUserRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true); // Initial loading state

    const navigate = useNavigate();
    const token = localStorage.getItem("Token");

    const checkTokenExpiration = useCallback(async () => {
        if (token) {
            const decoded = getJwtUser(token);

            if (!decoded || typeof decoded.exp !== "number") {
                setUserRole(null);
                setLoading(false); // Set loading to false when authentication check is done
                return;
            }

            if (decoded.exp < Date.now() / 1000) {
                setUserRole(null);
                localStorage.removeItem("token");
                navigate("/login");
                toastError("Your session is over! Please login again!!!");
                setLoading(false); // Set loading to false when authentication check is done
                return;
            } else {
                setUserRole(decoded.role);
                setLoading(false); // Set loading to false when authentication check is done
            }
        } else {
            setUserRole(null);
            setLoading(false); // Set loading to false when authentication check is done
            return;
        }
    }, [token, navigate]);

    useEffect(() => {
        checkTokenExpiration();
        const intervalId = setInterval(checkTokenExpiration, 60000);
        return () => clearInterval(intervalId);
    }, [checkTokenExpiration]);

    return { userRole, loading }; // Return loading state along with userRole
};
