import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { toastError } from "../Toast";
interface customJWTPayload extends JwtPayload {
    role: string[];
}
const getJwtUser = (token: string): customJWTPayload => {
    return jwtDecode(token);
};
export const useAuth = () => {
    const [userRoles, setUserRoles] = useState<string[] | null>(null);
    const [loading, setLoading] = useState(true); // Initial loading state

    const navigate = useNavigate();
    const token = localStorage.getItem("Token");

    const checkTokenExpiration = useCallback(async () => {
        if (token) {
            const decoded = getJwtUser(token);
            console.log(decoded);
            if (!decoded || typeof decoded.exp !== "number") {
                setUserRoles(null);
                setLoading(false); // Set loading to false when authentication check is done
                return;
            }

            if (decoded.exp < Date.now() / 1000) {
                setUserRoles(null);
                localStorage.removeItem("token");
                navigate("/login");
                toastError("Your session is over! Please login again!!!");
                setLoading(false); // Set loading to false when authentication check is done
                return;
            } else {
                setUserRoles(decoded.role);
                setLoading(false); // Set loading to false when authentication check is done
            }
        } else {
            setUserRoles(null);
            setLoading(false); // Set loading to false when authentication check is done
            return;
        }
    }, [token, navigate]);

    useEffect(() => {
        checkTokenExpiration();
        const intervalId = setInterval(checkTokenExpiration, 60000);
        return () => clearInterval(intervalId);
    }, [checkTokenExpiration]);

    return { userRoles, loading }; // Return loading state along with userRole
};
