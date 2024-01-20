import React from "react";
import { motion } from "framer-motion";

import {
  slideInFromLeft,
  slideInFromRight,
} from "@/utils/motion";
import { useInView } from "react-intersection-observer";
import { leaf, tools, icon24h } from "@/assets/image/home";

const data = {
  title: "Why Us",
  description:
    "Amet eu facilisi posuere ut at cras non ipsum proin nunc purus tellus ultricies velit elementum ut dui sed augue ultrices phasellus ullamcorper condimentum ut suspendisse viverra ornare sit venenatis",
};

const box =[
    {
        title: 'Eco-friendly',
        src: leaf
    },
    {
        title: '24/7 Support',
        src: icon24h
    },
    {
        title: 'Fast install',
        src: tools
    }
]

const Section4: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger once
    threshold: 0.3, // Trigger animation when 50% of the element is in view
  });

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      ref={ref}
      className="h-[800px] max-md:h-[500px] flex justify-end mt-20 w-screen shrink"
    >
        <motion.div
         animate={inView ? "visible" : "hidden"}
         variants={slideInFromLeft(0.3)}
        className="max-[1080px]:hidden bg-yellowCustom flex lg:w-[470px] lg:h-[454px] z-30
        mt-[220px] relative left-[100px] justify-center items-center
        "
      >
        <div className="w-[80%] mx-10">
            <p className="text-md font-openSans">
                {data.description}
            </p>
        </div>
      </motion.div>
      <motion.div 
       animate={inView ? "visible" : "hidden"}
       variants={slideInFromRight(0.4)}
      className="w-[65%] h-[450px] max-md:w-[100%] lg:h-[300px] relative  bg-darkCustom 
      shrink flex-col z-20
      
      ">
        <div className="flex w-auto items-center gap-4 ml-8 mt-4  max-[990px]:pb-10">
          <div className="h-[3px] w-[305px] bg-white max-[900px]:hidden" />
          <div className="font-playfair text-6xl text-white">{data.title}</div>
        </div>
        <div className="lg:w-[600px] w-full flex justify-center font-openSans 
        text-md text-white lg:col-start-3 lg:col-end-4
        max-[990px]:px-10 min-[900px]:ml-8 mt-6
        "> 
            {data.description}
        </div>
        <div className="w-[95%] flex gap-8  -bottom-[100px] lg:-bottom-[120px]  mt-10
          min-[768px]:absolute min-[768px]:pt-10 justify-center items-center
        ">
            {box.map((item, index) => (
                <div key={index} className=" lg:w-[170px] lg:h-[170px] w-[100px] h-[120px] shadow-md flex flex-col justify-center gap-4 bg-white items-center">
                    <img className="w-[50px] h-[50px]" src={item.src}/>
                    <p>{item.title}</p>
                </div>
            ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Section4;
