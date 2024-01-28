import React from "react";
import { motion } from "framer-motion";

import { picture2 } from "@/assets/image/home";
import { slideInFromRight, slideInFromTop } from "@/utils/motion";
import { Button } from "@/components/ui/Button/Button";
import Photo from "../photos";

const data = {
  title: "Our DNA",
  description:
    "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
  description2:
    "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
  button: {
    text: "Read More",
    link: "/about",
  },
};

const Section2: React.FC = () => {
  return (
    <div className="flex justify-center bg-white z-0">
      <motion.div
        initial="hidden"
        animate="visible"
        className="bg-white w-[100%] max-w-[1440px] h-[700px] max-[785px]:h-[auto] z-1 "
      >
        <motion.div className="bg-black max-[940px]:w-screen max-[785px]:h-[1300px] relative w-[80%] h-[600px] shrink z-10 
          max-[785px]:flex max-[785px]:flex-col gap-52
        ">
          <motion.div
            className="min-[785px]:w-[45%] flex justify-center  w-[100%] z-20 min-[785px]:absolute top-[70px] left-0
          max-[785px]:pt-10"
            variants={slideInFromTop}
          >
            {/* <img src={picture2} className="w-[549px] h-[624px]" /> */}
            <Photo src={picture2} ratio={16 / 9} />
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            className="pt-20 max-[785px]:flex max-[785px]:flex-col gap-8"
          >
            <motion.div
              variants={slideInFromRight(0.4)}
              className="z-50 lg:w-[600px] w-[auto] shrink gap-4 min-[778px]:absolute text-white left-[350px] top-[150px]  
            font-playfair text-6xl flex items-center  mx-auto max-[700px]:justify-center my-4
            
            "
            >
              {data.title}
              <div className="min-[1143px]:h-[3px] lg:w-[305px] lg:bg-yellowCustom" />
            </motion.div>

            <motion.div
              className="z-50 w-[50%] bottom-[70px] right-[30px] flex flex-col gap-4
           min-[740px]:absolute max-[738px]:mx-auto "
              variants={slideInFromRight(0.4)}
            >
              <div className="text-white shrink text-md font-openSans ">
                {data.description}
              </div>

              <div className="text-gray-500 shrink text-xl font-playfair ">
                {data.description2}
              </div>

              <Button
                className="w-[30%] max-[456px]:w-[50%] mt-8 text-black font-playfair"
                variant={"yellowCustom"}
              >
                {data.button.text}
              </Button>
            </motion.div>
          </motion.div>

        </motion.div>
      </motion.div>
    </div>
  );
};

export default Section2;
