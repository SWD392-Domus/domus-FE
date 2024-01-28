import React, { useEffect, useState } from "react";
import { AiOutlineFacebook } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";

import WebsiteName from "./WebsiteName";
import NavigationTab from "./NavigationTab";
import { AnimatePresence, motion } from "framer-motion";

const iconClassname = "text-white text-2xl";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen(!open);
  };

  useEffect(() => {
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
    <header>
      <div className="p-[40px] w-full bg-darkCustom">
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
          <div className="">
            <div
              className="w-10 h-10 bg-yellowCustom flex justify-center items-center cursor-pointer "
              onClick={toggleMenu}
            >
              <AnimatePresence>
                {open ? (
                  <motion.div
                    key="closeIcon"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <IoCloseSharp className={iconClassname} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="hamburgerIcon"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <RxHamburgerMenu className={iconClassname} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <AnimatePresence>{open && <NavigationTab />}</AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
