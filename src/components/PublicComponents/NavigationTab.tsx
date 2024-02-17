import React from "react";
import { motion } from "framer-motion";

import { menuVars, menuLinksVars, containerVars } from "@/utils/motion";
import { Button } from "../ui/Button/Button";
import { Link } from "react-router-dom";

const navLinks = [
    { title: "Home", href: "/" },
    { title: "Blog", href: "/" },
    { title: "Products", href: "/products" },
    { title: "Past Projects", href: "/" },
    { title: "Our Current Packages", href: "/" },
    { title: "Settings", href: "/" },
];

const signinLinks = {
    title: "Sign In",
    href: "/login",
};

const signUpLinks = {
    title: "Sign Up",
    href: "/",
};

const NavigationTab: React.FC = () => {
    return (
        <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-darkCustom z-50 w-screen h-full origin-top fixed left-0"
        >
            <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
                className="h-full w-screen flex flex-col justify-center gap-2"
            >
                {navLinks.map((link, index) => (
                    <div className="overflow-hidden">
                        <motion.ul
                            variants={menuLinksVars}
                            className="list-disc h-[58px] ml-20"
                        >
                            <li
                                key={index}
                                className="text-white inline-block max-md:text-2xl text-4xl 
                            cursor-pointer font-playfair hover:text-yellowCustom"
                            >
                                <a key={index} href={link.href}>
                                    {link.title}
                                </a>
                            </li>
                        </motion.ul>
                    </div>
                ))}
                <motion.div
                    variants={menuLinksVars}
                    className="flex justify-center items-center gap-10"
                >
                    <Button size={"lg"} variant={"yellowCustom"}>
                        <Link to={signinLinks.href}>
                            <p className="text-xl font-playfair">
                                {signinLinks.title}
                            </p>
                        </Link>
                    </Button>
                    <Button size={"lg"} variant={"yellowCustom"}>
                        <Link to={signUpLinks.href}>
                            <p className="text-xl font-playfair">
                                {signUpLinks.title}
                            </p>
                        </Link>
                    </Button>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default NavigationTab;
