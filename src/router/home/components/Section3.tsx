import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";
import { useInView } from "react-intersection-observer";

import { picture3, picture4 } from "@/assets/image/home";
import Photo from "../photos";

const data = [
  {
    title: "Selected Work",
    description:
      "Amet eu facilisi posuere ut at cras non ipsum proin nunc purus tellus ultricies velit elementum ut dui sed augue ultrices phasellus ullamcorper condimentum ut suspendisse viverra ornare sit venenatis",
  },
  {
    title: "Louis Vuitton",
    description:
      "Amet eu facilisi posuere ut at cras non ipsum proin nunc purus tellus ultricies velit elementum ut dui sed augue ultrices phasellus ullamcorper condimentum ut suspendisse viverra ornare sit venenatis",
  },
];

const Section3: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger once
    threshold: 0.3, // Trigger animation when 50% of the element is in view
  });

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      ref={ref}
      className="lg:h-[1000px] md:h-[950px] max-w-[1440px] w-screen mt-20"
    >
      <motion.div
        className="flex items-center gap-4 my-20"
        animate={inView ? "visible" : "hidden"}
        variants={slideInFromLeft(0.3)}
      >
        <div className="h-[3px] w-[305px] flex shrink bg-darkCustom ml-4" />
        <div className="font-playfair text-6xl text-darkCustom">
          {data[0].title}
        </div>
      </motion.div>
      <motion.div
        className="flex items-center gap-4 mx-20 w-[80%] justify-center"
        variants={slideInFromTop}
        animate={inView ? "visible" : "hidden"}
      >
        <div className="font-openSans text-darkCustom text-md">
          {data[0].description}
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        className="relative max-md:h-[500px] gap-2 mt-28 grid grid-rows-2"
      >
        <div className="col-span-1 flex gap-1 ">
          <motion.div
            variants={slideInFromRight(0.55)}
            animate={inView ? "visible" : "hidden"}
            className="w-[40%] max-[970px]:w-[55%] min-[800px]:absolute left-[300px] z-20 "
          >
            <Photo src={picture4} ratio={16 / 9} />
          </motion.div>
          <motion.div
            className="w-[30%] max-[970px]:w-[35%] min-[800px]:mt-[200px] z-30 min-[800px]:absolute left-5"
            animate={inView ? "visible" : "hidden"}
            variants={slideInFromLeft(0.5)}
          >
            <Photo src={picture3} ratio={16 / 9} />
          </motion.div>
        </div>

        <motion.div 
        variants={slideInFromTop}
        animate={inView ? "visible" : "hidden"}
        className="min-[1190px]:w-[30%] min-[1190px]:absolute min-[1190px]:right-[60px] 
        min-[800px]:mt-40 mt-20 ml-20 w-auto">
          <div className="flex flex-col items-center">
            <p className="font-playfair text-5xl mb-4">{data[1].title}</p>
            <p className="font-openSans text-md mt-4">{data[1].description}</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Section3;
