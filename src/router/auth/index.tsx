import Loading from "@/components/PublicComponents/Loading";
import { toastError, toastSuccess } from "@/components/Toast";
import { loginApi } from "@/utils/api/loginApi";
import React, { useEffect } from "react";
import { useNavigate,  } from "react-router-dom";

interface Props {
    // define your props here
}

const Auth: React.FC<Props> = () => {
    const navigate = useNavigate();
    const getGoogleAuthentication = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code") as string;
        const res = await loginApi.googleAuth(code);
        if (res.status != 200) {
            toastError("Login Unccesfully, please try again");
            navigate("/login");
        } else {
            if (res.data.isSuccess) {
                toastSuccess("Login Successfully");
                localStorage.setItem("Token", res.data.data.token.accessToken);
                navigate("/home");
            } else {
                toastError("Login Unccesfully, please try again");
                navigate("/login");
            }
        }
        // Ensure to remove the code from the URL to prevent re-execution of this code block
        const newUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
    };
    useEffect(() => {
        getGoogleAuthentication();
    }, []); // This effect should only run once when the component mounts

    return (
        <div>
            <Loading />
        </div>
    );
};

export default Auth;
