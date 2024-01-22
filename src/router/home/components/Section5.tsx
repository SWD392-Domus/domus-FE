import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Badge } from "@/components/ui/Badge";

import { slideInFromLeft, slideInFromRight } from "@/utils/motion";
import { blog1, blog2, blog3 } from "@/assets/image/home";
import Photo from "../photos";

const data = {
  title: "Latest Blogs",
  description:
    "Amet eu facilisi posuere ut at cras non ipsum proin nunc purus tellus ultricies velit elementum ut dui sed augue ultrices phasellus ullamcorper condimentum ut suspendisse viverra ornare sit venenatis",
};

const blogs = [
  {
    title: "Amet eu facilisi posuere ut at cras non ipsum proin",
    src: blog1,
  },
  {
    title: "Emu facilisi posuere ut at cras non ipsum proin",
    src: blog2,
  },
  {
    title: "Fasacilisi posuere ut at cras non ipsum proin",
    src: blog3,
  },
];

const Section5: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger once
    threshold: 0.3, // Trigger animation when 50% of the element is in view
  });
  return (
    <div className="flex justify-center bg-white">
      <motion.div
      initial="hidden"
      animate="visible"
      ref={ref}
      className="lg:h-[800px] w-full max-w-[1440px] max-[456px]:h-[1500px] h-[1800px]"
    >
      <motion.div
        className="bg-darkCustom w-[85%] h-[400px] 
         max-lg:h-[100%] max-lg:w-[100%]"
        animate={inView ? "visible" : "hidden"}
        variants={slideInFromLeft(0.3)}
      >
        <div className="flex items-center gap-4 pt-[80px]">
          <div className="h-[3px] w-[305px] max-[425px]:hidden bg-white " />
          <div className="font-playfair text-6xl max-[425px]:pl-2 text-white">{data.title}</div>
        </div>

        <motion.div 
        animate={inView ? "visible" : "hidden"}
        variants={slideInFromRight(0.4)}
        className="lg:flex lg:gap-8 grid grid-rows-3 gap-60">
          {blogs.map((blog, index) => (
            <div
              className="w-[370px] max-[456px]:w-[250px] -bottom-16 max-lg:left-[30%] left-[120px] max-[530px]:left-[40px] h-auto flex-col 
              gap-0 mt-[10px] rounded-md bg-white items-center relative justify-center"
              key={index}
            >
              <Badge className="absolute z-50 left-5 top-5" variant={"yellow"}>
                Interior
              </Badge>
              <div className=" z-20 ">
                <Photo src={blog.src} ratio={16 / 9} />
              </div>
              <div
                className="w-[auto] absolute h-[auto] p-4 -bottom-[200px]   
              flex items-center justify-center z-30 bg-black rounded-md"
              >
                <p className="font-playfair text-white text-xl ">
                  {blog.title}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
    </div>
    
  );
};

export default Section5;
