import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { menuVars, menuLinksVars, containerVars } from "@/utils/motion";
import { Button } from "../ui/Button/Button";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { userApi } from "@/utils/api/userApi";

const navLinks = [
    { title: "Home", href: "/" },
    { title: "Blogs", href: "/article" },
    { title: "Products", href: "/products" },
    { title: "Our Current Packages", href: "/package" },
    // { title: "Settings", href: "/settings" },    
    { title: "Staff", href: "/staff" },

];

const signinLinks = {
    title: "Sign In",
    href: "/login",
};

const logOutLinks = {
    title: "Log out",
    href: "/login",
};

const signUpLinks = {
    title: "Sign Up",
    href: "/",
};
interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface ProfileType {
    id?: string;
    email?: string;
    name?: string;
    phoneNumber?: string;
    profileImage?: string;
}
const NavigationTab: React.FC<Props> = (props) => {
    const [profile, setProfile] = useState<ProfileType>();
    const [isLogin, SetLogin] = useState<boolean>();
    const handleCloseMenu = () => {
        props.setOpen(false);
    };
    const handleLogout = () => {
        localStorage.removeItem("Token");
    };
    const getProfile = async () => {
        const token = localStorage.getItem("Token");
        if (token) {
            const res = await userApi.getOwnProfile(token);
            if (res.data.isSuccess) {
                setProfile(res.data.data);
                SetLogin(true);
            }
        } else {
            SetLogin(false);
        }
    };
    useEffect(() => {
        getProfile();
    }, []);
    return (
        <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-darkCustom z-50 w-screen h-[70%]
             origin-top fixed left-0"
        >
            <div className="w-full flex justify-end mt-10 text-center items-center">
                <h1 className="text-white cursor-pointer font-playfair max-md:text-xl mr-2 ">
                    {profile?.name}
                </h1>

                <Avatar className=" mr-20">
                    <AvatarImage
                        src={
                            profile?.profileImage
                                ? profile?.profileImage
                                : `https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1708278601~exp=1708279201~hmac=1aa24ff6087733cedf6f8e1a5b3a4494c2cd07599ae7f026027cea653cbb8151`
                        }
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
                className="h-full w-screen flex flex-col gap-2 mt-20 justify-start"
            >
                {navLinks.map((link, index) => (
                    <div className="overflow-hidden">
                        <motion.ul
                            variants={menuLinksVars}
                            className="list-disc h-[58px] ml-20"
                        >
                            <li
                                key={index}
                                className="text-white inline-block max-md:text-3xl text-2xl 
                            cursor-pointer font-openSans tracking-tighter font-bold hover:text-yellowCustom"
                            >
                                <Link
                                    key={index}
                                    to={link.href}
                                    onClick={handleCloseMenu}
                                >
                                    {link.title}
                                </Link>
                            </li>
                        </motion.ul>
                    </div>
                ))}
                {!isLogin ? (
                    <motion.div
                        variants={menuLinksVars}
                        className="flex justify-center items-center gap-10"
                    >
                        <Button size={"lg"} variant={"yellowCustom"}>
                            <Link
                                to={signinLinks.href}
                                onClick={handleCloseMenu}
                            >
                                <p className="text-xl font-bold tracking-tighter font-openSans">
                                    {signinLinks.title}
                                </p>
                            </Link>
                        </Button>
                        <Button size={"lg"} variant={"yellowCustom"}>
                            <Link
                                to={signUpLinks.href}
                                onClick={handleCloseMenu}
                            >
                                <p className="text-xl font-bold tracking-tighter font-openSans">
                                    {signUpLinks.title}
                                </p>
                            </Link>
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={menuLinksVars}
                        className="flex justify-center items-center gap-10"
                    >
                        <Button
                            size={"lg"}
                            variant={"yellowCustom"}
                            onClick={handleLogout}
                        >
                            <Link
                                to={logOutLinks.href}
                                onClick={handleCloseMenu}
                            >
                                <p className="text-xl font-bold tracking-tighter font-openSans">
                                    {logOutLinks.title}
                                </p>
                            </Link>
                        </Button>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default NavigationTab;
