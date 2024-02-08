import React from 'react'

import { productList } from "../../products/data";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/Carousel"

import ProductCard from './ProductCard';

interface Props  {}

const Suggestion: React.FC<Props> = () => {
    const products = productList;
  return (
    <div className='w-screen py-10 h-full flex flex-col justify-center items-center'>
        <div className='w-full flex flex-col justify-center items-center gap-2 '>
            <p className='font-light text-2xl'>You may like this</p>
            <div className='w-20 h-1 bg-black rounded-md'/>
        </div>
        
        <div className='pt-8 '>
        <Carousel className="
      w-[80vw] px-4 h-auto flex justify-center items-center"
      opts={{
        align: "start",
      }}
      >
        <CarouselContent>
            {products.map((item, index) => (
                <CarouselItem
                key={index}
                className="md:basis-1/3 lg:basis-1/4">
                    <ProductCard 
                    id={index}
                    name={item.name}
                    description={item.description}
                    src={item.src}
                    />
                </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
      <CarouselNext />
      </Carousel>
        </div>
    </div>
  )
}

export default Suggestion