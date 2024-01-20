import React from "react";
import { EnvelopeClosedIcon, Pencil2Icon } from "@radix-ui/react-icons"
import { areaInfo } from "./constants"
import { Link } from 'react-router-dom';
interface Props {
    // define your props here
}

const quoNum = 1;

const userInfo =
{
    name: "Nguyen Van A",
    email: "nguyenvana@fpt.edu.vn"
}

const customerSettings: React.FC<Props> = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-black bg-cover h-10 text-white pt-2">
                <div className="container flex flex-row justify-between my-auto">
                    <p className="logo">Domus Logo here</p>
                    <div className="mr-20">
                        {userInfo.name}
                    </div>
                </div>
            </header>
            <div className="flex-1 container">
                <div className="my-7 text-2xl font-semibold">
                    My Account
                </div>
                <div className="flex flex-row flex-wrap-reverse ">
                    <div className="left-side basis-2/3 font-semibold">
                        <div className="bg-orange-100 mb-5 h-16 flex rounded">
                            <div className="my-auto ml-4">
                                {quoNum} Báo giá cần xem xét
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-between rounded">
                            {areaInfo.map((area) => (
                                <Link to={`/customer/settings/${area.link}`}>
                                    <div className="bg-zinc-100 mb-10 flex flex-row hover:bg-zinc-300">
                                        <img className="m-4" src={area.src} alt={area.alt} />
                                        <div className="my-auto mr-5 w-80">
                                            <div className="text-lg">
                                                {area.name}
                                            </div>
                                            <span className="font-light text-gray-500 text-sm"><p>{area.description}</p></span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="right-side basis-1/3 flex flex-row justify-end">
                        <div className="w-60">
                            <div className="ava-header flex flex-row mb-5">
                                <img src="" alt="" className="h-10 w-10 bg-gray-300" />
                                <span className="ml-5 my-auto font-medium">{userInfo.name}</span>
                            </div>
                            <div className="user-info-body text-sm">
                                <div className="mail-info flex flex-row mb-5">
                                    <EnvelopeClosedIcon className="my-auto mr-2" />
                                    <span className="">{userInfo.email}</span>
                                </div>
                                <div className="flex flex-row mb-5">
                                    <Pencil2Icon className="my-auto mr-2" />
                                    <span className="">Edit information</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="bg-black bg-cover h-10"></footer>
        </div>
    )
}

export default customerSettings