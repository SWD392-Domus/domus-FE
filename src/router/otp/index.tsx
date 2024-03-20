import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import userSelector from "../login/slice/selector";
import { loginApi } from "@/utils/api/loginApi";
import { toastError, toastSuccess } from "@/components/Toast";
import { useNavigate } from "react-router-dom";

interface Props {
    // define your props here
}

const OTP: React.FC<Props> = () => {
    const navigate = useNavigate();
    const user: any = useSelector(userSelector.user);
    const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(4).fill(null));
    const [otp, setOTP] = useState<string>("");

    const handleInputChange = async (index: number, value: string) => {
        const newOTP =
            otp.substring(0, index) + value + otp.substring(index + 1);
        setOTP(newOTP);
        console.log(newOTP);
        if (index === inputRefs.current.length - 1) {
            console.log("sent");
            console.log(newOTP);
            const token = localStorage.getItem("Token");
            // Submit the OTP string if it reaches the end
            const res = await loginApi.confirmOtp(
                user.id,
                newOTP,
                token as string
            );
            if (res.status == 200) {
                if (res.data.isSuccess) {
                    toastSuccess("OTP Confirm Sucessfully");
                    const token = res.data.data.token.token.accessToken;
                    localStorage.setItem("Token", token);
                    navigate("/");
                } else {
                    toastError(res.data.messages[0].content);
                }
            } else {
                toastError("OTP Confirm success fully");
            }
            // You can call your submit function here
        } else if (value.length === 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    return (
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-cu py-12 w-full">
            <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-semibold text-3xl">
                            <p>Email Verification</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                            {user.email && (
                                <p>
                                    We have sent a code to your email{" "}
                                    {user.email}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <form action="" method="post">
                            <div className="flex flex-col space-y-16">
                                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                                    {Array.from({ length: 4 }, (_, index) => (
                                        <div key={index} className="w-16 h-16 ">
                                            <input
                                                ref={(el) =>
                                                    (inputRefs.current[index] =
                                                        el)
                                                }
                                                className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-yellowCustom"
                                                type="text"
                                                maxLength={1}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-yellowCustom border-none text-black text-xl shadow-sm font-medium">
                                            Verify Account
                                        </button>
                                    </div>

                                    <div className="flex flex-row items-center justify-center text-center text-md font-medium space-x-1 text-gray-500">
                                        <p>Didn't recieve code?</p>{" "}
                                        <a
                                            className="flex flex-row items-center text-blue-800"
                                            href="http://"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Resend
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OTP;
