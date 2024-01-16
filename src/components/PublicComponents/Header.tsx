import React from "react";
import { AiOutlineFacebook } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import WebsiteName from "./WebsiteName";

const iconClassname = "text-white text-2xl";

const Header: React.FC = () => {
  return (
    <div className="p-[40px] bg-darkCustom">
      <div className="flex items-center justify-between mx-16">
        <div className="flex gap-8">
          <AiOutlineFacebook className={iconClassname} />
          <FaInstagram className={iconClassname} />
        </div>
        <div className="">
          <WebsiteName/>
        </div>
       
       <div>
        <div className="w-10 h-10 bg-yellowCustom flex justify-center items-center">
          <RxHamburgerMenu className="text-2xl"/>
        </div>
       </div>
      </div>
    </div>
  );
};

export default Header;
