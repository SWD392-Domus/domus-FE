import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
interface Props {
  src: string[];
}

const CarouselProducts: React.FC<Props> = ({ src }) => {
  return (
    <Carousel
      className="
      w-full h-full flex justify-center items-center
      
      "
    >
      <CarouselContent>
        {src.map((item, index) => (
          <CarouselItem key={index}>
            <div>
              <img
                className="object-contain shrink
           w-full h-full py-2 aspect-[16/9]"
                src={item}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CarouselProducts;
