import React from "react";
import Unauthorized from "@/assets/image/Unauthorized.jpg";
import { Button } from "@/components/ui/Button/Button";
import { HomeIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
interface Props {
    // define your props here
}

const Error403Page: React.FC<Props> = (props) => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/");
    };
    return (
        <div className="flex items-center justify-center flex-col ">
            <img src={Unauthorized} className="w-[45%]" />
            <h1 className="text-5xl w-[70%] text-center m-4">
                Sorry, You dont have the authorized to access this section
            </h1>
            <Button
                variant={"yellowCustom"}
                className="items-center texl-l mt-10 mb-10 w-[20%]"
                onClick={handleNavigate}
            >
                <HomeIcon className="mr-4" width={"25"} height={"25"} />
                <h1 className="text-xl">Home</h1>
            </Button>
        </div>
    );
};

export default Error403Page;
