import React from "react";
import { motion } from "framer-motion"
import { slideInFromLeft } from "@/utils/motion";

interface Props {

}


const Home: React.FC<Props>= () => {
  return (
      <motion.div 
      initial="hidden"
      animate="visible"
      className="bg-darkCustom h-[500px] ring-1 ring-destructive relative"
      >
        <motion.div 
        variants={slideInFromLeft(0.2)} 
        className="w-[40px] ml-[96px] absolute top-[150px]">
          <p className="font-playfair text-6xl text-white">Architecture Studio</p>
        </motion.div>

      </motion.div>
  )
}

export default Home;