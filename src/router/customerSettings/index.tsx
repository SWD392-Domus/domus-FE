import React from "react";
// import { EnvelopeClosedIcon, Pencil2Icon } from "@radix-ui/react-icons";
import {
    areaInfo
    // , userInfo
    // , quoNum 
} from "./constants";
import { Link } from "react-router-dom";
// import { Avatar, AvatarImage } from "@/components/ui/Avatar";

interface Props {
    // define your props here
}

const customerSettings: React.FC<Props> = () => {
    return (
        <>
            <div className="my-7 text-2xl font-semibold">My Account</div>
            <div className="flex flex-row flex-wrap-reverse ">
                <div className="left-side basis-2/3 font-semibold">
                    <div className="bg-orange-100 mb-5 h-16 flex rounded">
                        <div className="my-auto ml-4">
                            Account Setting and Tracking Information
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-between rounded">
                        {areaInfo.map((area) => (
                            <Link to={`/customer/settings/${area.link}`}>
                                <div className="bg-zinc-100 mb-10 flex flex-row hover:bg-zinc-300">
                                    <img
                                        className="m-4"
                                        src={area.src}
                                        alt={area.alt}
                                    />
                                    <div className="my-auto mr-5 w-80">
                                        <div className="text-lg">
                                            {area.name}
                                        </div>
                                        <span className="font-light text-gray-500 text-sm">
                                            <p>{area.description}</p>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="right-side basis-1/3 flex flex-row justify-end">
                    <div className="w-60">
                        {/* <div className="ava-header flex flex-row mb-5">
                            <Avatar className="mr-4">
                                <AvatarImage src={userInfo.avaLink} />
                            </Avatar>
                            <span className="my-auto font-medium text-2xl">
                                {userInfo.name}
                            </span>
                        </div>
                        <div className="user-info-body ">
                            <div className="mail-info flex flex-row mb-5">
                                <EnvelopeClosedIcon
                                    className="my-auto mr-2"
                                    width={35}
                                    height={35}
                                />
                                <span className="text-xl">
                                    {userInfo.email}
                                </span>
                            </div>
                            <Link
                                className="text-xl flex hover:text-yellowCustom"
                                to="/profile"
                            >
                                <Pencil2Icon
                                    className="my-auto mr-2"
                                    width={20}
                                    height={20}
                                />
                                Edit information
                            </Link>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default customerSettings;
