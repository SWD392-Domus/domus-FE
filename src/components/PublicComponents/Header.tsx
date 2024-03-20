import React, { useEffect, useState } from "react";
import { AiOutlineFacebook } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import WebsiteName from "./WebsiteName";
import NavigationTab from "./NavigationTab";
import { AnimatePresence, motion } from "framer-motion";
// import { FaCartShopping } from "react-icons/fa6";
import { useDispatch } from "react-redux";
// import selector from "@/router/customerCart/slice/selector";
import { actions } from "@/router/customerCart/slice";
// import { Link } from "react-router-dom";
import Notification from "./Notification";
import { useAuth } from "@/components/customHooks/useAuth";

const iconClassname = "text-white text-2xl";

const Header: React.FC = () => {
    const { userRoles } = useAuth();
    const dispatch = useDispatch();
    // const cartNumber: number = useSelector(selector.cartNumber);
    const [open, setOpen] = useState(false);
    const genericHamburgerLine = `h-[3px] w-6 my-[2px] rounded-full bg-white transition ease transform duration-300`;

    const toggleMenu = () => {
        setOpen(!open);
    };

    useEffect(() => {
        const cartNumber: any =
            localStorage.getItem("cart") &&
                JSON.parse(localStorage.getItem("cart") as string).productDetails
                ? JSON.parse(localStorage.getItem("cart") as string)
                    .productDetails.length
                : 0;
        dispatch(actions.setCartNumber(cartNumber));
        // When the NavigationTab is open, prevent scrolling
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            // When the NavigationTab is closed, allow scrolling
            document.body.style.overflow = "auto";
        }

        // Clean up function to reset overflow when component unmounts
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [open]);

    return (
        <header className="w-full">
            <div className="p-[40px] w-full bg-darkCustom ">
                <div
                    className="flex w-auto items-center lg:mx-16 md:mx-12  justify-between shrink
       "
                >
                    <div className="flex max-[528px]:hidden gap-8 ">
                        <AiOutlineFacebook className={iconClassname} />
                        <FaInstagram className={iconClassname} />
                    </div>
                    <div>
                        <WebsiteName />
                    </div>

                    <div className="flex gap-5 items-center">
                        {userRoles &&
                            <Notification />}
                        {/* {userRoles &&
                            <Link to="/customer/settings/cart">
                                <div
                                    className="w-12 h-12 bg-yellowCustom flex justify-center items-center 
          rounded-full cursor-pointer hover:opacity-80 relative"
                                >
                                    <div className="bg-red-600 text-white w-6 h-6 rounded-full text-center items-center absolute -right-2 -top-2">
                                        {cartNumber}
                                    </div>
                                    <FaCartShopping className="text-black" />
                                </div>
                            </Link>} */}
                        <motion.div
                            className="w-12 h-12 bg-yellowCustom flex flex-col group justify-center items-center cursor-pointer "
                            onClick={toggleMenu}
                            whileHover={{ scale: 1.1 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <AnimatePresence>
                                <div
                                    className={`${genericHamburgerLine} ${open
                                        ? "rotate-45 translate-y-[7.1px] opacity-100"
                                        : "opacity-100"
                                        }`}
                                />
                                <div
                                    className={`${genericHamburgerLine} ${open ? "opacity-0" : "opacity-100 "
                                        }`}
                                />
                                <div
                                    className={`${genericHamburgerLine} ${open
                                        ? "-rotate-45 -translate-y-[7.1px] opacity-100 "
                                        : "opacity-100"
                                        }`}
                                />
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
                <AnimatePresence>
                    {open && <NavigationTab setOpen={setOpen} />}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default Header;
