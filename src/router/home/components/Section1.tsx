import React from "react";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight } from "@/utils/motion";
import { picture1 } from "@/assets/image/home";
import Photo from "../photos";

const Section1: React.FC = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="bg-darkCustom w-screen max-w-[1440px] flex items-center gap-2  h-[500px] relative z-0"
    >
      <motion.div
        variants={slideInFromLeft(0.2)}
        className="w-[500px] ml-10 lg:ml-32 z-30 shrink"
      >
        <p className="font-playfair text-6xl text-white">Architecture Studio</p>
      </motion.div>

      <motion.div
        variants={slideInFromRight(0.4)}
        className="min-[762px]:w-[65%] max-w-[1440px] w-screen absolute max-[762px]:right-[50px] right-[200px] z-20"
      >
        <Photo src={picture1} ratio={16/9} />
      </motion.div>
    </motion.div>
  );
};

export default Section1;
